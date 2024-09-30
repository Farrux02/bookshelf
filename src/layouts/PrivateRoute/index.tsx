import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import { CircularProgress } from "@mui/material";

const PrivateRoute = () => {
  const key = localStorage.getItem("key");

  if (!key) {
    return <Navigate to="/" />;
  }

  return (
    <div className="overflow-y-hidden">
      <Header />
      <main className="w-screen min-h-[calc(100vh-70px)] bg-gray-100 pt-6">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <CircularProgress />
            </div>
          }
        >
          <Outlet />
        </Suspense>
        <ToastContainer />
      </main>
    </div>
  );
};

export default PrivateRoute;
