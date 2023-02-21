#!/bin/bash
rm -rf ./stelo
rsync -av --exclude "node_modules" \
        --exclude ".next" \
        --exclude ".husky" \
        --exclude ".git" \
        --exclude ".vscode" \
        --exclude ".github" \
        --exclude ".aws" \
        --exclude ".graphqlrc.yml" \
        --exclude "assets" \
        --exclude "apps" \
        --exclude "dist" \
        --exclude "release" \
        --exclude "release.**" \
        --exclude "packages/ui" \
        --exclude "packages/eslint-config-custom" \
        --exclude "packages/stelo_graphql_types" \
        --exclude "packages/snippet" \
        --exclude "packages/tsconfig" \
        --exclude "scripts" \
        --exclude "**.stories.**" \
        --exclude "**.test.**" \
        ../mono/ ./stelo

mv stelo/packages/* ./stelo 
rm -rf stelo/packages

rm stelo/package.json \
 stelo/**/package.json \
 stelo/*.md \
 stelo/*.json \
 stelo/yarn* \
 stelo/.eslintrc.js \
 stelo/.gitignore \
 stelo/.prettierrc \
 stelo/**/tsconfig.json


# flatten pkg.json
# find replace paths