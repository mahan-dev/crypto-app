import { Route, Routes } from "react-router-dom";
import Home from "@/components/templates/Home";

import { lazy, Suspense } from "react";
import Loader from "@/components/loader/Loader";

const CoinDetail = lazy(() => import("@/components/templates/CoinDetail"));
const Favorite = lazy(() => import("@/components/templates/Favorite"));

const RouterPage = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />

      <Suspense
        fallback={
          <div className="mx-auto">
            <Loader />
          </div>
        }
      >
        <Route element={<CoinDetail />} path=":coinId" />
        <Route element={<Favorite />} path="/favorite" />
      </Suspense>
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

// import { lazy, Suspense } from "react";
// import { Route, Routes } from "react-router-dom";

// const Home = lazy(() => import("@/components/templates/Home"));
// const CoinDetail = lazy(() => import("@/components/templates/CoinDetail"));
// const Favorite = lazy(() => import("@/components/templates/Favorite"));

// const RouterPage = () => {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <Routes>
//         <Route path="/" element={<Home />} />

//         <Route path=":coinId" element={<CoinDetail />} />

//         <Route path="/favorite" element={<Favorite />} />

//         <Route
//           path="*"
//           element={
//             <h2 className="w-full text-center mt-12">something went wrong</h2>
//           }
//         />
//       </Routes>
//     </Suspense>
//   );
// };

// export default RouterPage;
