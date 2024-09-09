//@ts-ignore
import { HttpService } from "@arena/common-web";
const serviceInfo ={"applicationName":"@arena/trade-finance-web","getAllDataRout":"/trade-finance-ms/trade-finance/lc"}
//@ts-ignore
const httpService = new HttpService(serviceInfo?.applicationName);
interface RequestOptions {
  withSuccessToast?: boolean;
  manualClose?: boolean;
  successMessage?: string;
  mode?: string;
  withLoader?: boolean;
  overlay?: boolean;
  withoutToast?: boolean;
}

interface RequestParams<TBody = null, TResponse = null, TError = null> {
  queries?: Record<string, string | number | null | boolean>;
  options?: RequestOptions;
  then?: (data: TResponse) => void;
  body?: TBody;
  id?: string | number;
  catchError?: (data: TError) => void;
}

interface DataApi {
  data: {
    data: {
      content: any[];
      totalElementsOfSearch: number;
      totalPages: number;
      totalElementsOfPage: number;
    };
  };
}
export const getAllDataService = ({
  queries,
  options,
  then,
  catchError,
}: RequestParams<null, DataApi>) => {
  //@ts-ignore
  return httpService.get(serviceInfo?.getAllDataRout, {
    queries,
    options,
    then,
    catchError,
  });
};
