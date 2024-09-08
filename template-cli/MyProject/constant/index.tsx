export const applicationName: string = "@arena/trade-finance-web";

export const permissions: Record<string, string> = {
  view: "",
  edit: "CC_UPDATE_CUSTOMER_COMPLAINT",
  delete: "",
};
export const getAllDataRout = "/trade-finance-ms/trade-finance/lc";

export interface TableDataMapping {
  [key: string]: string;
}

export const parameterMapping: TableDataMapping = {
  financingRequestNumber: "financingRequestNumber",
  requestDate: "requestDate",
  lcRequestNumber: "lcRequestNumber",
  applicantName: "applicantName",
  lcStatus: "lcStatus",
  searchKey: "searchKey",
};

export const emptyParameters: Record<string, string | null> = {
  lcFinancingRequestId: "",
  lcRequestNumber: "",
  applicantName: "",
  requestDate: "",
  lcStatus: "",
};
