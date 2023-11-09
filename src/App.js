import "./assets/css/custom.css";
import "../src/assets/css/neumorphism.css";
import './assets/css/auth-boxed.css';
import './assets/css/dash_1.css';
import './assets/css/LoaderUni.css';
import './assets/css/main.css';
import './assets/css/monokai-sublime.css';
import './assets/css/perfect-scrollbar.css';
import './assets/css/structure.css';
import './assets/css/waves.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Base from "./components/Base";
import ErrorBoundary from "./components/ErrorBoundry";
import Site from "./pages/Sites";
import EditSite from "./components/Sites/EditSite";
import Login from "./pages/Login";
import MultiSiteQuote from "./pages/Sites/MultiSiteQuote";
import Companies from "./pages/Companies";
import EditCompany from "./pages/Companies/EditCompany";
import NewForm from "./pages/FormPage";
import GroupSites from "./pages/GroupSites/GroupSites";
import DashboardCompany from "./pages/Companies/DashboardCompany";
import DashboardSite from "./pages/Sites/DashboardSite";
import AddQuote from "./pages/Quotes/AddQuote";
import Quote from "./pages/Quotes";
import EditQuote from "./pages/Quotes/EditQuote";
import GroupQuotes from "./pages/QuoteGroup/GroupQuotes";
import AddGroupQuote from "./pages/QuoteGroup/AddGroupQuote";
import EditGroupQuote from "./pages/QuoteGroup/EditGroupQuote";
import Notes from "./pages/Notes/Notes";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Base />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "sites",
          element: <Site />,
        },
        {
          path: "sites/:siteId",
          element: <DashboardSite />,
        },
        {
          path: "sites/edit/:siteId",
          element: <EditSite />,
        },
        {
          path: "companies",
          element: <Companies />,
        },
        {
          path: "companies/:companyId",
          element: <DashboardCompany />,
        },
        {
          path: "companies/edit/:editId",
          element: <EditCompany />,
        },
        {
          path: "group-sites",
          element: <GroupSites />,
        },
        {
          path: "group-sites/edit/:groupSiteId",
          element: <GroupSites />,
        },
        {
          path: "multi-site-quote",
          element: <MultiSiteQuote />,
        },
        {
          path: "form",
          element: <NewForm />,
        },
        {
          path: "quotes",
          element: <Quote />,
        },
        {
          path: "quotes/add",
          element: <AddQuote />,
        },
        {
          path: "quotes/edit/:quoteId",
          element: <EditQuote />,
        },
        {
          path: "group-quotes",
          // element: <GroupQuotes />,
        },
        {
          path: "group-quotes/add",
          element: <AddGroupQuote />,
        },
        {
          path: "group-quotes/edit/:quoteId",
          element: <EditGroupQuote />,
        },
        {
          path: "notes",
          element: <Notes />,
        },
        {
          path: "notes/edit/:noteId",
          element: <Notes />,
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
  ],
  { basename: "/powercrmlatest" }
);

function App() {
  return (
    <>
      <ErrorBoundary>
        <RouterProvider router={router}></RouterProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
