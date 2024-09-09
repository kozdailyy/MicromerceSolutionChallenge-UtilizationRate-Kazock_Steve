import { QuarterEarnings, WorkforceUtilisation } from "./types";

export const getNetEarningsPrevMonth = (
  workforceUtilisation: WorkforceUtilisation
) => {
  const now = new Date();
  const prevMonth = new Date(now.setMonth(now.getMonth() - 1));
  const formattedPrevMonth = `${prevMonth.getFullYear()}-${String(
    prevMonth.getMonth() + 1
  ).padStart(2, "0")}`;

  // Finf the quarter earnings for the previous month
  const findQuarterEarnings = (
    month: string,
    quarters: QuarterEarnings[] | undefined
  ) => {
    if (!quarters) {
      return "0.0"; // Return "0.0" if quarterEarning is undefined
    }

    for (const quarter of quarters) {
      const start = new Date(quarter.start);
      const end = new Date(quarter.end);
      const current = new Date(`${month}-01`);
      if (current >= start && current <= end) {
        return quarter.earnings;
      }
    }

    return "0.0"; // Return a default value if no matching quarter is found
  };

  const netEarningsPrevMonth = findQuarterEarnings(
    formattedPrevMonth,
    workforceUtilisation?.quarterEarnings
  );

  return netEarningsPrevMonth;
};
