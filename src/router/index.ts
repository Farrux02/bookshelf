import { createBrowserRouter, redirect } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    Component: lazy(() => import("../layouts/EmptyLayout")),
    children: [
      {
        index: true,
        loader: async () => redirect("/signup"),
      },
      {
        path: "signup",
        Component: lazy(() => import("../pages/Signup")),
      },
    ],
  },
  {
    path: "/books",
    Component: lazy(() => import("../layouts/PrivateRoute")),
    children: [
      {
        index: true,
        Component: lazy(() => import("../pages/BooksList")),
      },
    ],
  },
]);

export default router;
