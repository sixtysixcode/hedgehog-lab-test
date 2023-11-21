import { Navigate } from "react-router-dom";

export type PrivateRouteProps = {
  authenticationPath: string;
  outlet: JSX.Element;
};

export function PrivateRoute({
  authenticationPath,
  outlet,
}: PrivateRouteProps) {
  const isAuthenticated = localStorage.getItem("auth");
  if (isAuthenticated) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
}
