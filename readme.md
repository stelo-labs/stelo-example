# Stelo Example App

## Getting started

- `git clone ...`
- `cd waymont-handoff`
- `yarn` (install dependencies)
- `yarn dev`(start server on port 5173)

# Integration

- Copy the`stelo` folder into the root of your project or if you're using a monorepo into the corresponding app directory.
- Add the below to your `tsconfig.json` `compilerOptions`. (We're happy to help triage issues here)

```
    "baseUrl": "src", // If you already have a `baseUrl` set, the below `paths` need to be relative to that directory
    "paths": {
      "shared_types": ["../stelo/shared_types/index.ts"],
      "uiv2/*": ["../stelo/uiv2/*"],
      "utils": ["../stelo/utils/index.ts"],
      "utils/*": ["../stelo/utils/*"],
    }

```

# TODO

- [x] Handle .env key
- [x] Hit correct route in fetcher
- [x] Disable analytics
- [ ] Add your API
