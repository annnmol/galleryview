import { RouterProvider } from "react-router-dom";
import appRouter from "./routes/routes";
import { AppStoreContextProvider } from "./store/app-store-context";

function App() {
  return (
    <>
      <AppStoreContextProvider>
        <RouterProvider router={appRouter} />
      </AppStoreContextProvider>
    </>
  );
}

export default App;
