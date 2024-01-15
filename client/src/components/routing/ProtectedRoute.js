import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AutContext";
import Spinner from "react-bootstrap/Spinner";
import NavbarMenu from "../layouts/NavbarMenu";

const ProtectedRoute = ({ children, redirectTo }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="into" />
      </div>
    );

  return isAuthenticated ? <>
  <NavbarMenu />
  {children}
  </> : <Navigate to={`${redirectTo}`} />;
};

export default ProtectedRoute;
