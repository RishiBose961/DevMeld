import { Navigate, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/store";
import { useEffect } from "react";
import { loadUser } from "@/slice/authSlice";

const PrivateRoute = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading,user } = useSelector(
    (state: { auth: { user: unknown | null; isAuthenticated: boolean; isLoading: boolean } }) =>
      state.auth
  );
 useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (isLoading) {
    return null;
  }
  return user ? <Outlet/> : <Navigate to='/' replace/>
};

export default PrivateRoute;
