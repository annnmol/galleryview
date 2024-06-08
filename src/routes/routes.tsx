import { Navigate, createBrowserRouter } from "react-router-dom";
//user defined
import LibraryScreen from "@/screens/gallery/library-screen";
import HomeScreen from "@/screens/home-screen";
import Layout from "@/screens/layout";

const appRouter = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomeScreen />,
        },
        {
          path: "/:id",
          element: <LibraryScreen />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ],
  {
    basename: "/",
  }
);

export default appRouter;
