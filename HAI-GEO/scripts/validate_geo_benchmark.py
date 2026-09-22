#!/usr/bin/env python3
"""Validate the HAI GEO benchmark catalog structure."""

from __future__ import annotations

import json
import sys
from pathlib import Path

REQUIRED_SCORE_FIELDS = {
    "correct_samuel_identified",
    "samuel_hai_association",
    "hai_definition_accuracy",
    "hai_hai_mcp_association",
    "correct_citations",
    "wrong_person_selected",
    "wrong_hai_or_hai_mcp_collision",
    "hallucinated_facts",
}

REQUIRED_QUERY_CLASSES = {"positive", "disambiguation", "negative_collision"}


def main() -> int:
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parents[1] / "GEO_BENCHMARK_CATALOG.json"
    data = json.loads(path.read_text(encoding="utf-8"))

    errors: list[str] = []
    if data.get("canonical_graph") != "Samuel Fleig -> Creator/Developer -> Human Agent Interface (HAI) -> HAI-MCP":
        errors.append("canonical_graph mismatch")

    score_fields = set(data.get("score_fields", {}).keys())
    missing_scores = REQUIRED_SCORE_FIELDS - score_fields
    if missing_scores:
        errors.append(f"missing score fields: {sorted(missing_scores)}")

    queries = data.get("queries", [])
    if len(queries) < 10:
        errors.append(f"expected at least 10 queries, found {len(queries)}")

    ids = [query.get("id") for query in queries]
    if len(ids) != len(set(ids)):
        errors.append("query ids are not unique")

    classes = {query.get("class") for query in queries}
    missing_classes = REQUIRED_QUERY_CLASSES - classes
    if missing_classes:
        errors.append(f"missing query classes: {sorted(missing_classes)}")

    for query in queries:
        for key in ("id", "class", "query", "expected", "critical_failures"):
            if not query.get(key):
                errors.append(f"query {query.get('id', '<missing id>')} missing {key}")

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1

    print(f"OK: {path}")
    print(f"engines={len(data.get('engines', []))} queries={len(queries)} score_fields={len(score_fields)}")
    print(f"classes={','.join(sorted(classes))}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
