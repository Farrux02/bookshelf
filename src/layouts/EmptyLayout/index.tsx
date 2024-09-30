import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

const EmptyLayout = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading</div>}>
        <Outlet />
      </Suspense>
      <ToastContainer />
    </div>
  );
};

export default EmptyLayout;
