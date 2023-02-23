import { ExtensionMetadata } from "./store";

const API_KEY = "AtoJBOzp1HobmDvATQtMZ.9f";

// Does not do any actual schema validation
export function fetcher<R, T>(
  url: URL,
  data: R,
  extensionMetadata?: ExtensionMetadata
) {
  const _url = new URL(url);
  //@ts-ignore
  if (API_KEY !== "") {
    _url.searchParams.append("apiKey", API_KEY);
  }
  let metatadataHeaders = {};
  if (!!extensionMetadata)
    metatadataHeaders = {
      "stelo-extension-version": extensionMetadata.extensionVersion,
      "stelo-rpc-request-id": extensionMetadata.rpcRequestId,
      "stelo-device-id": extensionMetadata.deviceId,
    };
  return fetch(_url, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...metatadataHeaders,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(
        `Fetch error on url ${url} with data ${JSON.stringify(data)}: ${
          err.stack || err.message
        }`
      );
    }) as Promise<T>;
}
