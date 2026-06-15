import RouterPage from "@/components/router/RouterPage";
import { BrowserRouter as Router } from "react-router-dom";

import Provider from "@/components/providers/Provider";



const App = () => {
  return (
    <Provider>
      <Router>
        <RouterPage />
      </Router>
    </Provider>
  );
};

export default App;
