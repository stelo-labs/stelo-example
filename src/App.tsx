import { useState } from "react";
import "./App.css";
import "uiv2/css/globalStyles.css";
import "uiv2/css/themeContract.css";
import { type SignatureRequest } from "shared_types";
import { AssetChangeSection } from "uiv2/views/AssetChangeSection/AssetChangeSection";
import { useEnrichRequest } from "uiv2/store";

const exampleRequest = {
  rpcRequestId: "optional-id",
  method: "eth_sendTransaction",
  params: [
    {
      data: "0x095ea7b3000000000000000000000000000000000022d473030f116ddee9f6b43ac78ba3ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      from: "0x5da723b2472399d2d2f3bbc2c3674263aada977b",
      gas: "0x11c88",
      to: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    },
  ],
};

function App() {
  const [count, setCount] = useState(0);
  const { loading, data } = useEnrichRequest(exampleRequest);
  return (
    <div className="App">
      {!loading && !!data && <AssetChangeSection response={data} />}
    </div>
  );
}

export default App;
