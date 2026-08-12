import { Route, Routes } from "react-router-dom";
import Home from "@/components/templates/Home";

import { lazy } from "react";

const CoinDetail = lazy(() => import("@/components/templates/CoinDetail"));
const Favorite = lazy(() => import("@/components/templates/Favorite"));

const RouterPage = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />

      <Route element={<CoinDetail />} path=":coinId" />
      <Route element={<Favorite />} path="/favorite" />

      <Route
        path="*"
        element={
          <h2 className="w-full text-center mt-12"> something went wrong</h2>
        }
      />
    </Routes>
  );
};

export default RouterPage;