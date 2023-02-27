import { ExtensionMetadata } from "./store";
import axios from "axios";

// Need to expose this via a top-level React Context
const API_KEY = "REPLACE_THIS_WITH_YOUR_API_KEY";

// Does not do any actual schema validation
export function fetcher<R, T>(
  url: URL,
  data: R,
  extensionMetadata?: ExtensionMetadata
) {
  // Create new instance otherwise apiKey keeps appending
  const _url = new URL(url.toString());
  _url.searchParams.append("apiKey", API_KEY);
  let metatadataHeaders = {};
  if (!!extensionMetadata)
    metatadataHeaders = {
      "stelo-extension-version": extensionMetadata.extensionVersion,
      "stelo-rpc-request-id": extensionMetadata.rpcRequestId,
      "stelo-device-id": extensionMetadata.deviceId,
    };

  return axios
    .post(_url.toString(), data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...metatadataHeaders,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(
        `Fetch error on url ${url}:\n ${err.stack || err.message}`
      );
    }) as Promise<T>;
}

export type OnRetryCtx = { baseDelay: number; attempt: number };

export const withRetry = <P extends any>(
  call: () => Promise<P>,
  onRetry: (ctx: OnRetryCtx) => void = () => {}
): Promise<P> => {
  // Turn these into args if needed
  const baseDelay = 100;
  const numberOfTries = 3;

  const retry = async (attempt = 1): Promise<P> => {
    try {
      return await call();
    } catch (error) {
      if (attempt >= numberOfTries) return Promise.reject();
      // Use an increasing delay to prevent flooding the
      // server with requests in case of a short downtime.
      const delay = baseDelay * attempt;
      onRetry({ baseDelay, attempt });
      return new Promise((resolve) => {
        setTimeout(() => resolve(retry(attempt + 1)), delay);
      });
    }
  };

  return retry();
};
