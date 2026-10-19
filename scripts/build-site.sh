#!/bin/sh
# Assembles the GitHub Pages site in _site/: the page in site/ plus the
# design system files it reads at load time. Used by .github/workflows/pages.yml.
set -e
cd "$(dirname "$0")/.."

rm -rf _site
mkdir _site
cp -R site/. _site/
cp -R tokens.css tokens.json guidelines.md design-system.json package.json components assets _site/
touch _site/.nojekyll

echo "Built _site/"
