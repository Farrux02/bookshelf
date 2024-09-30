import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "css/index.css";
import "css/tailwind.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.ts";
import { QueryClient, QueryClientProvider } from "react-query";
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
