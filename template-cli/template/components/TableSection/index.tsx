import React, { useEffect, useState } from "react";
import {
  SearchIcon,
  EyeIcon,
  EditIcon,
  ArenaInput,
  ArenaDefaultChip,
  //@ts-ignore
} from "@arena/components";
//@ts-ignore
import { Table, Pagination, Button } from "digitinary-ui";
//@ts-ignore
import { Utils, haveAccess } from "@arena/common-web";
//@ts-ignore
import "./style.scss";
//@ts-ignore
import { getAllDataService } from "../../services";
import FilterSection from "../FilterSection";
export type Parameter = Record<string, string | null>;

const TableSection = () => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentHeadCell, setCurrentHeadCell] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [data, setData] = useState<any[]>([{}]);
  const [parameter, setParameter] = useState<Parameter>(
    //@ts-ignore
    "filterSearchParameters"
  );
  const headCellsData = "headCellsData";
  const statusColors = { DRAFT: "gray" };
  // avaliable Colors => "green" , "red" , "c" , "blue" ,"black" ,"dark-blue" ,"orange"
  const permissions: Record<string, string> = {
    view: "",
    edit: "",
    delete: "",
  };
  const handleParameterChange = (newValue: string, key: string) => {
    setParameter((prev: Parameter) => ({ ...prev, [key]: newValue }));
  };

  const getData = () => {
    getAllDataService({
      queries: {
        pageNumber,
        pageSize: 10,
        sortOrder: sort,
        sortField: currentHeadCell,
        ...parameter,
      },

      then: (result: any) => {
        const resultData = result?.data?.data;
        setData(resultData.content);
        setTotalElements(resultData.totalElementsOfSearch);
        setTotalPages(resultData.totalPages);
      },
    });
  };

  useEffect(() => {
    getData();
  }, [parameter, sort, pageNumber]);

  const handleTableData = (data: any[]) => {
    return data?.map((item: any) => {
      const mappedData = "MY_PARAMETER";
      const ViewButton = (
        <Button
          variant="link"
          color="action"
          onClick={() => {}}
          startIcon={<EyeIcon height={18} width={18} />}
        >
          View
        </Button>
      );

      const EditButton = (
        <Button
          variant="link"
          color="primary"
          disabled={false}
          onClick={() => {}}
          startIcon={
            <EditIcon className={`cancel-icon`} height={18} width={18} />
          }
        >
          Edit
        </Button>
      );

      const DeleteButton = (
        <Button
          variant="link"
          color="error"
          disabled={false}
          onClick={() => {}}
        >
          Delete
        </Button>
      );

      // Conditionally render buttons based on permissions
      //@ts-ignore
      mappedData.actions = (
        <div className="table-actions-container">
          {(!permissions?.view || haveAccess([permissions.view])) && ViewButton}
          {(!permissions?.edit || haveAccess([permissions.edit])) && EditButton}
          {(!permissions?.delete || haveAccess([permissions.delete])) &&
            DeleteButton}
        </div>
      );

      return mappedData;
    });
  };

  return (
    <div className="table-page-container">
      <div className="table-header-container">
        <ArenaInput
          onChange={(value: string) => {
            handleParameterChange(value as string, "searchKey");
            setPageNumber(0);
          }}
          size="medium"
          placeholder={`Search`}
          type="text"
          value={parameter.searchKey}
          className="search-input-field"
          endAdornment={
            <SearchIcon
              data-id="SEARCH_FIELD_ICON"
              className={`search-icon ${
                parameter.search ? "active" : "inactive"
              }`}
              width={24}
              height={24}
            />
          }
        />
        <div className="actions-container">
          <FilterSection
            parameter={parameter}
            setParameter={setParameter}
            setPageNumber={setPageNumber}
            setSort={setSort}
            setCurrentHeadCell={setCurrentHeadCell}
            disabled={false}
          />
        </div>
      </div>

      <div>
        <Table
          headCells={headCellsData}
          data={handleTableData(data)}
          currentHeadCell={currentHeadCell}
          setCurrentHeadCell={setCurrentHeadCell}
          sort={sort}
          setSort={(prev) => {
            setPageNumber(0);
            setSort(prev);
          }}
          footer={
            <Pagination
              page={pageNumber + 1}
              setPage={setPageNumber}
              count={totalPages}
              totalElement={totalElements}
              disabledExportExcelBtn={false}
              disabledExportPdfBtn={false}
              excelExport={() => {}}
              showPageCount={true}
              showExportButtons={false}
              disabledNextButton={false}
              removeFirstLastButtons={false}
              pageSize={10}
              className=""
            />
          }
        />
      </div>
    </div>
  );
};

export default TableSection;
