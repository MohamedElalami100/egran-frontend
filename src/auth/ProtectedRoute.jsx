// src/RequireAuth.js
import { Navigate } from "react-router-dom";
import useAuth from "./AuthProvider";

function RequireAuth({ children }) {
  const { authed } = useAuth();

  return authed === true ? children : <Navigate to="/" />;
}

export default RequireAuth;
