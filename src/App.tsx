import RouterPage from "@/components/router/RouterPage";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <Layout>
      <Router>
        <RouterPage />
      </Router>
    </Layout>
  );
};

export default App;
