import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateCodeFragment from "../../pages/CreateCodeFragment";
import CodeFragmentDetail from "../../pages/CodeFragmentDetail";
import Layout from "./Layout";
import ErrorBox from "../components/ErrorBox";
import ScrollToTop from "../components/ScrollToTop";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CreateCodeFragment />} />
          <Route path=":id" element={<CodeFragmentDetail />} />
          <Route
            path="*"
            element={<ErrorBox message="This page does not exist!" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
