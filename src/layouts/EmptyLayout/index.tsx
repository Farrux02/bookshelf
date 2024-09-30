import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

const EmptyLayout = () => {
  return (
    <div>
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
    </div>
  );
};

export default EmptyLayout;
