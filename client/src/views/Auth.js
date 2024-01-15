import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthContext } from "../contexts/AutContext";
import { useContext } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Navigate } from "react-router-dom";

const Auth = ({ authRoute }) => {
  // const navigate = useNavigate();
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  let body;

  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="into" />
      </div>
    );
  } else if (isAuthenticated) 
  return <Navigate to={`/dashboard`}></Navigate>
  // navigate("/dashboard")
  ;

  body = <>{authRoute === "login" ? <LoginForm /> : <RegisterForm />}</>;

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Learn IT</h1>
          <h4>Keep trying</h4>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
