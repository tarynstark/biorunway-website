#!/bin/bash

# Remove the empty tickets.json file
rm tickets.json

# Add all changes
git add .

# Commit with the specified message
git commit -m "Update workflow to Linear-only, archive tickets.json

- Archive tickets.json to docs/archive/tickets-archived-2025-01-23.json
- Update CLAUDE.md workflow section to Linear-only task management
- Remove local JSON ticketing system in favor of Linear integration
- Add archive README explaining historical context

🤖 Generated with Claude Code"