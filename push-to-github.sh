#!/bin/bash
# Push Survey System to GitHub
# Run this script after downloading all files

echo "🚀 Pushing to GitHub: Shoofai/survey"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "Initializing git..."
    git init
    git add .
    git commit -m "Initial commit: Complete survey and voting system for Project C"
fi

# Add remote if not exists
if ! git remote | grep -q origin; then
    echo "Adding GitHub remote..."
    git remote add origin https://github.com/Shoofai/survey.git
fi

# Push to GitHub
echo "Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Done! Check: https://github.com/Shoofai/survey"
