//@ts-ignore
import { HttpService2 } from "@arena/common-web";
import { DocumentsResponse } from "../types";
const serviceInfo = {
  applicationName: "@arena/loan-management-web",
  getAllDataRout: "/loan-ms/loan",
};
//@ts-ignore
const httpService2 = new HttpService2(serviceInfo?.applicationName);
interface RequestOptions {
  manualClose?: boolean;
  successMessage?: string;
  mode?: string;
  withLoader?: boolean;
  overlay?: boolean;
  withoutToast?: boolean;
  withToast?: boolean;
  fullResponse?: boolean;
}

interface RequestParams<TBody = null> {
  queries?: Record<string, string | number | null | boolean>;
  options?: RequestOptions;
  body?: TBody;
  id?: string | number;
  civilId?: string | null;
}

export const getAllDataService = async ({
  queries,
  options,
}: RequestParams<null>) => {
  return await httpService2.call("GET", serviceInfo?.getAllDataRout, {
    queries,
    options: {
      withToast: false,
      ...options,
    },
  });
};
export const getProfileDetailsService = async ({
  queries,
  options,
}: RequestParams<null>) => {
  return await httpService2.call("GET", `/loan-ms/loan/profile-details`, {
    queries,
    options: {
      withToast: false,
      ...options,
    },
  });
};

export const UploadFilesService = async ({
  body,
  queries,
  options,
}: RequestParams<FormData>) => {
  return await httpService2.call("POST", `/loan-ms/data/upload`, {
    body,
    queries,
    options: {
      fullResponse: true,
      ...options,
    },
  });
};

export const getFileService = async ({
  queries,
  fileName,
  options,
}: RequestParams<null> & { fileName?: string }) => {
  if (!fileName) return;

  return await httpService2.call("GET", `/loan-ms/data/${fileName}/download`, {
    queries,
    params: { responseType: "blob" },
    options: {
      fullResponse: true,
      responseType: "blob",
      withToast: false,
      ...options,
    },
  });
};

export const startProcessService = async ({
  loanId,
  body,
  queries,
  options,
}: RequestParams<any> & {
  loanId: string;
}) => {
  return await httpService2.call(
    "POST",
    `/loan-ms/loan/start-process/${loanId}`,
    {
      body,
      queries,
      options,
    }
  );
};

export const createLoanService = async ({
  body,
  queries,
  options,
  civilId,
}: RequestParams<Record<string, string | null | Record<string, string>>>) => {
  return await httpService2.call("POST", `/loan-ms/loan/${civilId}`, {
    body,
    queries,
    options,
  });
};

export const updateLoanService = async ({
  loanId,
  body,
  queries,
  options,
}: RequestParams<
  Record<
    string,
    | string
    | number
    | null
    | Record<
        string,
        | string
        | number
        | DocumentsResponse
        | null
        | Record<string, string | number | null>
      >
  >
> & { loanId: string }) => {
  return await httpService2.call("PATCH", `/loan-ms/loan/${loanId}`, {
    body,
    queries,
    options: {
      withToast: true,
      ...options,
    },
  });
};
export const updateLoanDocumentService = async ({
  loanId,
  body,
  queries,
  options,
}: RequestParams<Record<string, string[]>> & { loanId: string }) => {
  return await httpService2.call("PUT", `/loan-ms/loan/${loanId}/document`, {
    body,
    queries,
    options: {
      withToast: true,
      ...options,
    },
  });
};
export const getSpecificLoanService = async ({
  loanId,
  queries,
  options,
}: RequestParams<null> & {
  loanId: string | null;
}) => {
  if (!loanId) return;

  return await httpService2.call("GET", `/loan-ms/loan/${loanId}`, {
    queries,
    options: {
      withToast: false,
      ...options,
    },
  });
};

export const getSpecificTaskById = async ({
  id,
  queries,
  options,
}: RequestParams<null> & {
  id?: string;
}) => {
  if (!id) return;

  return await httpService2.call("GET", `/loan-ms/loan/tasks/${id}`, {
    queries,
    options: {
      withToast: false,
      ...options,
    },
  });
};

export const getFinancialHealthMetrics = async ({
  civilId,
  queries,
  options,
}: RequestParams<null> & {
  civilId?: string;
}) => {
  if (!civilId) return;

  return await httpService2.call(
    "GET",
    `/loan-ms/loan/financial-health-metrics/${civilId}`,
    {
      queries,
      options: {
        withToast: false,
        ...options,
      },
    }
  );
};

export const submitTaskService = async ({
  loanId,
  body,
  queries,
  options,
}: RequestParams<
  Record<
    string,
    | string
    | boolean
    | null
    | number
    | undefined
    | Record<string, string | boolean | null | number | undefined>
  >
> & {
  loanId: string;
}) => {
  return await httpService2.call(
    "POST",
    `/loan-ms/loan/submit-task/${loanId}`,
    {
      body,
      queries,
      options: {
        withToast: true,
        ...options,
      },
    }
  );
};
