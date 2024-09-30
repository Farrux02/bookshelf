import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

const PrivateRoute = () => {
  const key = localStorage.getItem("key");

  if (!key) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Suspense fallback={<div>Loading</div>}>
        <Outlet />
      </Suspense>
      <ToastContainer />
    </div>
  );
};

export default PrivateRoute;
