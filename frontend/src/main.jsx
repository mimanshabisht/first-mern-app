import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "@/components/ui/provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider>
        {" "}
        <App />{" "}
      </Provider>
    ),
    children: [
      { path: "", element: <HomePage /> },
      { path: "create", element: <CreatePage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
