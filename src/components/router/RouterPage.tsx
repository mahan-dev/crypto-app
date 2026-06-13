import { Route, Routes } from "react-router-dom";
import Home from "@/components/templates/Home";


const RouterPage = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/"/>
      <Route />
      <Route path="*" />
    </Routes>
  );
};

export default RouterPage;
