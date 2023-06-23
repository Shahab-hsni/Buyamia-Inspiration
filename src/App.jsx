import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Loader from "@/components/Global/Loader";
import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import Page404 from "@/pages/Page404";

const App = () => {
  const element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/search", element: <SearchPage /> },
    { path: "*", element: <Page404 /> },
  ]);

  return <Suspense fallback={<Loader text="page" />}>{element}</Suspense>;
};

export default App;
