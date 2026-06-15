import type { Dispatch, SetStateAction } from "react";

export const UsePage = (
  step: number,
  setPage: Dispatch<SetStateAction<number>>,
  click: boolean = false,
) => {
  const url = new URL(window.location.href);

  
    setPage((prev) => {
      const nextPage = click ? step : prev + step;

      url.searchParams.set("page", nextPage.toString());
      window.history.pushState({}, "", url.toString());

      return nextPage;
    });
  
};
