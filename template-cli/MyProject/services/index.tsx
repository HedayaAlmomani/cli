//@ts-ignore
import { HttpService } from "@arena/common-web";
import { applicationName, getAllDataRout } from "../constant";
const httpService = new HttpService(applicationName);

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
  return httpService.get(getAllDataRout, {
    queries,
    options,
    then,
    catchError,
  });
};
