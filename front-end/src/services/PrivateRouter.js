import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

export function isAuthenticated() {
  const Token = sessionStorage.getItem("token");
  try {
    jwt_decode(Token, "shatish_desai");
    return true;
  } catch (error) {
    return false;
  }
}

export const PrivateRouter = ({ children, ...rest }) => {
  const isAuth = isAuthenticated();
  const location = useLocation();
  if (!isAuth) {
    return (
      <Navigate
        to="/login"
        state={{ from: location, cource: location.state }}
      />
    );
  }

  return children;
};

export default PrivateRouter;
