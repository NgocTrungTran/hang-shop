import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/layouts/Landing";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AutContext";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import About from "./views/About";
import PostContextProvider from "./contexts/PostContext";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/login"
              Component={(props) => <Auth {...props} authRoute="login" />}
            />
            <Route
              path="/register"
              Component={(props) => <Auth {...props} authRoute="register" />}
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute redirectTo={"/login"}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute redirectTo={"/login"}>
                  <About />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
