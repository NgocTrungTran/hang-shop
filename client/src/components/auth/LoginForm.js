import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AutContext";
import AlertMessage from "../layouts/AlertMessage";

const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext);

  // Router

  // Local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null)

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const login = async (event) => {
    event.preventDefault(); //Tránh form submit theo kiểu HTML

    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        setAlert({type: 'success', message: loginData.message})
        setTimeout(() => setAlert(null), 3000)
      } else {
        setAlert({type: 'danger', message: loginData.message})
        setTimeout(() => setAlert(null), 3000)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group className="my-3">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            required
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Control
            type="text"
            placeholder="Password"
            name="password"
            value={password}
            required
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p className="my-3">
        Don't have an account?
        <Link to="/register">
          <Button value="into" size="sm" className="ml-2 mx-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
