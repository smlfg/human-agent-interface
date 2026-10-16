/* mail-fallback.js - Robuster Kontakt-Fallback fuer mailto:-Links.
 *
 * Verhalten:
 *  - Klick auf a[href^="mailto:"] laeuft normal weiter (kein preventDefault).
 *  - ~800 ms spaeter, wenn die Seite noch sichtbar und fokussiert ist
 *    (= kein Mail-Programm hat sich geoeffnet), erscheint ein zugaengliches
 *    Popup mit Adresse, "Adresse kopieren", "In Gmail oeffnen", "In Outlook oeffnen".
 *  - Global: window.mailFallback(mailtoUrl) fuer Elemente, die per JS eine Mail ausloesen.
 *
 * Kein Inline-Script, keine externen Abhaengigkeiten. CSP-'self'-kompatibel:
 * das Stylesheet wird als <link> auf dieselbe Origin nachgeladen.
 */
(function () {
  "use strict";

  var SHOW_DELAY = 800;
  var dialogState = null;
  var lastTrigger = null;

  var STRINGS = {
    de: {
      title: "E-Mail senden",
      intro: "Es scheint kein Mail-Programm geöffnet worden zu sein. Wähle einen Weg oder kopiere die Adresse:",
      addressLabel: "E-Mail-Adresse",
      copy: "Adresse kopieren",
      copied: "Adresse kopiert",
      gmail: "In Gmail öffnen",
      outlook: "In Outlook öffnen",
      close: "Schließen",
    },
    en: {
      title: "Send email",
      intro: "It looks like no mail app opened. Pick a route or copy the address:",
      addressLabel: "Email address",
      copy: "Copy address",
      copied: "Address copied",
      gmail: "Open in Gmail",
      outlook: "Open in Outlook",
      close: "Close",
    },
  };

  function strings() {
    var lang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
    return lang.indexOf("de") === 0 ? STRINGS.de : STRINGS.en;
  }

  function decode(value) {
    try {
      return decodeURIComponent(String(value));
    } catch (error) {
      return String(value);
    }
  }

  function parseMailto(raw) {
    if (!raw || raw.indexOf("mailto:") !== 0) return null;
    var rest = raw.slice("mailto:".length);
    var queryIndex = rest.indexOf("?");
    var addressPart = queryIndex === -1 ? rest : rest.slice(0, queryIndex);
    var query = queryIndex === -1 ? "" : rest.slice(queryIndex + 1);

    var params = {};
    if (query) {
      query.split("&").forEach(function (pair) {
        if (!pair) return;
        var eq = pair.indexOf("=");
        var key = (eq === -1 ? pair : pair.slice(0, eq)).toLowerCase();
        var value = eq === -1 ? "" : pair.slice(eq + 1);
        if (!Object.prototype.hasOwnProperty.call(params, key)) params[key] = decode(value);
      });
    }

    var address = decode(addressPart).trim();
    if (!address && params.to) address = params.to;
    if (!address) return null;

    return {
      address: address,
      subject: params.subject || "",
      body: params.body || "",
      raw: raw,
    };
  }

  function gmailUrl(data) {
    return (
      "https://mail.google.com/mail/?view=cm&fs=1" +
      "&to=" + encodeURIComponent(data.address) +
      "&su=" + encodeURIComponent(data.subject) +
      "&body=" + encodeURIComponent(data.body)
    );
  }

  function outlookUrl(data) {
    return (
      "https://outlook.live.com/mail/0/deeplink/compose" +
      "?to=" + encodeURIComponent(data.address) +
      "&subject=" + encodeURIComponent(data.subject) +
      "&body=" + encodeURIComponent(data.body)
    );
  }

  function stylesheetHref() {
    var script = document.currentScript;
    if (script && script.src) {
      return script.src.replace(/[^/]*$/, "mail-fallback.css");
    }
    return "/mail-fallback.css";
  }

  function ensureStyles() {
    if (document.querySelector("link[data-mail-fallback-css]")) return;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = stylesheetHref();
    link.setAttribute("data-mail-fallback-css", "");
    document.head.appendChild(link);
  }

  function fallbackCopy(text) {
    try {
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.top = "-1000px";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      var ok = document.execCommand("copy");
      area.remove();
      return ok;
    } catch (error) {
      return false;
    }
  }

  function copyText(text, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { done(true); },
        function () { done(fallbackCopy(text)); }
      );
    } else {
      done(fallbackCopy(text));
    }
  }

  function close() {
    if (!dialogState) return;
    document.removeEventListener("keydown", onKeydown, true);
    if (dialogState.overlay.parentNode) dialogState.overlay.parentNode.removeChild(dialogState.overlay);
    var trigger = dialogState.trigger || lastTrigger;
    dialogState = null;
    if (trigger && typeof trigger.focus === "function") {
      try { trigger.focus(); } catch (error) { /* ignore */ }
    }
  }

  function onKeydown(event) {
    if (event.key === "Escape" || event.key === "Esc") {
      event.preventDefault();
      close();
    }
  }

  function buildDialog(data, trigger) {
    ensureStyles();
    var t = strings();

    var overlay = document.createElement("div");
    overlay.className = "mail-fallback-overlay";
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) close();
    });

    var dialog = document.createElement("div");
    dialog.className = "mail-fallback-dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "mail-fallback-title");
    overlay.appendChild(dialog);

    var head = document.createElement("div");
    head.className = "mail-fallback-head";
    dialog.appendChild(head);

    var title = document.createElement("h2");
    title.className = "mail-fallback-title";
    title.id = "mail-fallback-title";
    title.textContent = t.title;
    head.appendChild(title);

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "mail-fallback-close";
    closeBtn.setAttribute("aria-label", t.close);
    closeBtn.textContent = "\u00d7";
    closeBtn.addEventListener("click", close);
    head.appendChild(closeBtn);

    var intro = document.createElement("p");
    intro.className = "mail-fallback-intro";
    intro.textContent = t.intro;
    dialog.appendChild(intro);

    var row = document.createElement("div");
    row.className = "mail-fallback-address";
    dialog.appendChild(row);

    var addressText = document.createElement("span");
    addressText.className = "mail-fallback-address-text";
    addressText.textContent = data.address;
    row.appendChild(addressText);

    var copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "mail-fallback-copy";
    copyBtn.textContent = t.copy;
    copyBtn.addEventListener("click", function () {
      copyText(data.address, function (ok) {
        copyBtn.textContent = ok ? t.copied : t.copy;
        window.setTimeout(function () { copyBtn.textContent = t.copy; }, 2000);
      });
    });
    row.appendChild(copyBtn);

    var actions = document.createElement("div");
    actions.className = "mail-fallback-actions";
    dialog.appendChild(actions);

    function webLink(href, label) {
      var a = document.createElement("a");
      a.className = "mail-fallback-link";
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = label;
      a.addEventListener("click", function () { window.setTimeout(close, 0); });
      return a;
    }

    actions.appendChild(webLink(gmailUrl(data), t.gmail));
    actions.appendChild(webLink(outlookUrl(data), t.outlook));

    document.addEventListener("keydown", onKeydown, true);
    document.body.appendChild(overlay);

    dialogState = { overlay: overlay, trigger: trigger };
    copyBtn.focus();
  }

  function open(data, trigger) {
    if (dialogState) close();
    lastTrigger = trigger || lastTrigger;
    buildDialog(data, trigger);
  }

  function schedule(raw, trigger) {
    window.setTimeout(function () {
      if (document.visibilityState !== "visible" || !document.hasFocus()) return;
      var data = parseMailto(raw);
      if (!data) return;
      open(data, trigger);
    }, SHOW_DELAY);
  }

  document.addEventListener("click", function (event) {
    var node = event.target;
    var link = node && node.closest ? node.closest('a[href^="mailto:"]') : null;
    if (!link) return;
    var raw = link.getAttribute("href");
    if (!raw || raw === "mailto:") return;
    schedule(raw, link);
  }, true);

  window.mailFallback = function (url) {
    var raw = String(url || "");
    if (raw.indexOf("mailto:") !== 0) {
      if (raw) window.location.href = raw;
      return;
    }
    try { window.location.href = raw; } catch (error) { /* ignore */ }
    schedule(raw, null);
  };
})();
