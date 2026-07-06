import type { SortField, SortOrder } from "@/types/coinsList/coinListTypes";
import type { Dispatch, SetStateAction } from "react";

const statusHelperHandler = (
  field: SortField,
  sortField: SortField,
  setSortOrder: Dispatch<SetStateAction<SortOrder>>,
  setSortField: Dispatch<SetStateAction<SortField>>,
) => {
  if (sortField === field) {
    setSortOrder((prev) => {
      return prev === "default" ? "down" : prev === "down" ? "up" : "default";
    });
    return;
  }

  setSortField(field);
  setSortOrder("down");
};

export { statusHelperHandler };
