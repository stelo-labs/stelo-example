# Stelo Example App

## Getting started

- `git clone git@github.com:stelo-labs/stelo-example.git stelo-example`
- `cd stelo-example`
- `yarn` (install dependencies)
- open up `stelo/uiv2/fetch.ts` and make sure the API_KEY variable is assigned to the API key provided to you.
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

- We expose a hook to quickly call our API from React. `import { useEnrichRequest } from "uiv2/store";`
- The entry point to our `AssetChangeSection` is exposed from `import { AssetChangeSection } from "uiv2/views/AssetChangeSection/AssetChangeSection";`
- Integration could be as simple as `src/App.tsx`

```
function App() {
  const { loading, data } = useEnrichRequest(exampleRequest);
  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && data && <AssetChangeSection response={data} />}
    </div>
  );
}
```
