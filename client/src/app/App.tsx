import {BrowserRouter, Route, Routes} from "react-router-dom";
import FrontPage from "../features/codeFragment/FrontPage";
import DetailsPage from "../features/codeFragment/DetailsPage";
import Layout from "./layout/Layout";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBox from "./components/ErrorBox";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<FrontPage/>}/>
          <Route path=":id" element={<DetailsPage/>}/>
          <Route
            path="*"
            element={<ErrorBox message="This page does not exist!"/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
