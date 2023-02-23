const getEnvVar = (ENV_VAR: any, ENV_VAR_NAME: string, fallback?: any) => {
  if (typeof ENV_VAR !== "undefined") {
    return ENV_VAR;
  }
  if (typeof fallback === "undefined") {
    throw new Error(`Missing environment variable: ${ENV_VAR}`);
  }
  return fallback;
};

type Config = {
  analyticsEnabled: boolean;
};

const apiHost = getEnvVar(
  // Can't do dynamic access with vite
  import.meta.env.VITE_STELO_HOST,
  "VITE_STELO_HOST",
  "https://app.steloapi.com/"
);
const versionRoute = getEnvVar(
  import.meta.env.VITE_STELO_VERSION_ROUTE,
  "STELO_VERSION_ROUTE",
  "api/v0/"
);

export const config: Config = {
  analyticsEnabled: getEnvVar(
    import.meta.env.VITE_ANALYTICS_ENABLED,
    "ANALYTICS_ENABLED",
    false
  ),
};

const BASE_URL = new URL(versionRoute, apiHost);
export const TRANSACTION_URL = new URL("transaction", BASE_URL);
export const SIGNATURE_URL = new URL("signature", BASE_URL);
export const ANALYTICS_EVENT_URL = new URL("event", BASE_URL);
