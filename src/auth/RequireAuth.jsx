import useAuth from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { authed } = useAuth();

  return authed === true ? children : <Navigate to="/" />;
}
