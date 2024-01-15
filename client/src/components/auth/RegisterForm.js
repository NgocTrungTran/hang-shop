import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AutContext";
import AlertMessage from "../layouts/AlertMessage";

const RegisterForm = () => {
  const { registerUser } = useContext(AuthContext);

  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const register = async (event) => {
    event.preventDefault(); //Tránh form submit theo kiểu HTML

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Password do not match" });
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    try {
      const registerData = await registerUser(registerForm);
      if (registerData.success) {
        
      } else {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form onSubmit={register}>
      <AlertMessage info={alert} />
        <Form.Group className="my-3">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Control
            type="text"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Control
            type="text"
            placeholder="Confirm password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p className="my-3">
        Do have an account?
        <Link to="/login">
          <Button value="into" size="sm" className="ml-2 mx-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
