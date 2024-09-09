import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo } from "react";
import sourceData from "./source-data.json";
import type { SourceDataType, TableDataType } from "./types";
import { getNetEarningsPrevMonth } from "./utils";

/**
 * Example of how a tableData object should be structured.
 *
 * Each `row` object has the following properties:
 * @prop {string} person - The full name of the employee.
 * @prop {number} past12Months - The value for the past 12 months.
 * @prop {number} y2d - The year-to-date value.
 * @prop {number} may - The value for May.
 * @prop {number} june - The value for June.
 * @prop {number} july - The value for July.
 * @prop {number} netEarningsPrevMonth - The net earnings for the previous month.
 */

const tableData: TableDataType[] = (sourceData as unknown as SourceDataType[])
  .map((dataRow, index) => {
    const workforce = dataRow?.employees
      ? dataRow?.employees
      : dataRow?.externals
      ? dataRow?.externals
      : null;
    const person = `${workforce?.firstname} - ...`;
    const past12Months =
      Number(workforce?.workforceUtilisation?.utilisationRateLastTwelveMonths) *
      100;
    const y2d =
      Number(workforce?.workforceUtilisation?.utilisationRateYearToDate) * 100;

    const may = workforce?.workforceUtilisation?.lastThreeMonthsIndividually
      ? Number(
          workforce?.workforceUtilisation?.lastThreeMonthsIndividually[0]
            ?.utilisationRate
        ) * 100
      : 0;
    const june = workforce?.workforceUtilisation?.lastThreeMonthsIndividually
      ? Number(
          workforce?.workforceUtilisation?.lastThreeMonthsIndividually[1]
            ?.utilisationRate
        ) * 100
      : 0;
    const july = workforce?.workforceUtilisation?.lastThreeMonthsIndividually
      ? Number(
          workforce?.workforceUtilisation?.lastThreeMonthsIndividually[2]
            ?.utilisationRate
        ) * 100
      : 0;

    const netEarningsPrevMonth = workforce?.workforceUtilisation
      ? getNetEarningsPrevMonth(workforce?.workforceUtilisation)
      : 0;
    const row: TableDataType = {
      person: `${person}`,
      past12Months: `${past12Months}%`,
      y2d: `${y2d}%`,
      may: `${may}%`,
      june: `${june}%`,
      july: `${july}%`,
      netEarningsPrevMonth: `${netEarningsPrevMonth} EUR`,
    };

    return row;
  })
  .filter((dataRow) => dataRow.y2d.includes("NaN") === false);

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<TableDataType>[]>(
    () => [
      {
        accessorKey: "person",
        header: "Person",
      },
      {
        accessorKey: "past12Months",
        header: "Past 12 Months",
      },
      {
        accessorKey: "y2d",
        header: "Y2D",
      },
      {
        accessorKey: "may",
        header: "May",
      },
      {
        accessorKey: "june",
        header: "June",
      },
      {
        accessorKey: "july",
        header: "July",
      },
      {
        accessorKey: "netEarningsPrevMonth",
        header: "Net Earnings Prev Month",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData,
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
