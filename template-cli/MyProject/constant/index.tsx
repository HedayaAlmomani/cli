export const filterSearchParameters = {
  financingRequestNumber: "",
  lcRequestNumber: "",
  applicantName: "",
  requestDate: "",
  lcStatus: "",
  searchKey: "",
};

export const headCellsFinanceRequests = [
  { id: "lcRequestNumber", label: `LC Request Number`, sortable: true },
  { id: "applicantName", label: `Applicant Name`, sortable: true },
  { id: "requestDate", label: `Request Date`, sortable: true },
  { id: "lcStatus", label: `LC Status`, sortable: true },
  { id: "lcStage", label: `LC Stage`, sortable: true },
  { id: "actions", label: `Actions`, sortable: false },
];

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

export const lCStatusOptions = [
  { label: "label", value: "value" },
  { label: "label", value: "value" },
  { label: "label", value: "value" },
];

export const serviceName = "finance";

export const emptyParameters = {
  lcFinancingRequestId: "",
  lcRequestNumber: "",
  applicantName: "",
  requestDate: "",
  lcStatus: "",
};

export interface Parameter {
  lcFinancingRequestId: string | null;
  lcRequestNumber: string | null;
  applicantName: string | null;
  requestDate: string | null;
  lcStatus: string | null;
  [key: string]: string | null;
}

export const statusColors: { [key: string]: string } = {
  APPROVED: "green",
  REJECTED: "red",
  EXPIRED: "gray",
  IN_PROGRESS: "blue",
  INITIATED: "black",
  SUBMITTED: "dark-blue",
  AWAITING_REVISION: "orange",
};
