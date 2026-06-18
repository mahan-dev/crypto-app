import { Route, Routes } from "react-router-dom";
import Home from "@/components/templates/Home";
import CoinDetail from "../templates/CoinDetail";

const RouterPage = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />

      <Route element={<CoinDetail />} path=":coinId"  />
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
