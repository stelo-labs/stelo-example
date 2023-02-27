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

# Stash QuestionMark
mv stelo/uiv2/components/RiskDisplay/Question.tsx tmp_Question.tsx
mv stelo/uiv2/views/AssetChangeSection tmp_AssetChangeSection
mv stelo/uiv2/views/ContractCallSection tmp_contractCallSection

rm -rf \
 stelo/packages \
 stelo/uiv2/components/Disclaimer \
 stelo/uiv2/components/Footer \
 stelo/uiv2/components/Nav \
 stelo/uiv2/components/RiskDisplay \
 stelo/uiv2/components/RiskDisplay \
 stelo/uiv2/components/TypedData \
 stelo/uiv2/layout \
 stelo/uiv2/views \
#  stelo/uiv2/components/DataTable \
#  stelo/uiv2/components/Recipient \

# put QuestionMark back
mkdir -p stelo/uiv2/components/RiskDisplay
mkdir -p stelo/uiv2/views
mv tmp_Question.tsx stelo/uiv2/components/RiskDisplay/Question.tsx
mv tmp_AssetChangeSection stelo/uiv2/views/AssetChangeSection
mv tmp_contractCallSection stelo/uiv2/views/ContractCallSection

rm \
 stelo/uiv2/App.tsx \
 stelo/**/package.json \
 stelo/*.md \
 stelo/*.json \
 stelo/yarn* \
 stelo/.eslintrc.js \
 stelo/.gitignore \
 stelo/.prettierrc \
 stelo/**/tsconfig.json \
 stelo/uiv2/index.ts \
 stelo/uiv2/.babelrc |
 stelo/uiv2/jest.config.js
 




# flatten pkg.json
# find replace paths