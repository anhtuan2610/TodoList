import { createContext } from "react";
import { Merchant } from "../../types/response/form";

const MerchantContext = createContext<{ data: Merchant | undefined }>({
  data: undefined,
});

export default MerchantContext;
