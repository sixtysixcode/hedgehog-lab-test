import { Navigate } from "react-router-dom";

export type PrivateRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
};

export function PrivateRoute({
  isAuthenticated,
  authenticationPath,
  outlet,
}: PrivateRouteProps) {
  console.log("private route isAuthenticated: ", isAuthenticated);
  if (isAuthenticated) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
}
