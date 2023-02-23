const getEnvVar = (ENV_VAR: string, fallback?: any) => {
  const env_var = import.meta.env[ENV_VAR];
  if (typeof env_var !== "undefined") {
    return env_var;
  }
  if (typeof fallback === "undefined") {
    throw new Error(`Missing environment variable: ${ENV_VAR}`);
  }
  return fallback;
};

type Config = {
  analyticsEnabled: boolean;
};

const apiHost = getEnvVar("STELO_HOST", "https://app.steloapi.com/");
const versionRoute = getEnvVar("STELO_VERSION_ROUTE", "api/v0/");

export const config: Config = {
  analyticsEnabled: getEnvVar("ANALYTICS_ENABLED", false),
};

const BASE_URL = new URL(versionRoute, apiHost);
export const TRANSACTION_URL = new URL("transaction", BASE_URL);
export const SIGNATURE_URL = new URL("signature", BASE_URL);
export const ANALYTICS_EVENT_URL = new URL("event", BASE_URL);
