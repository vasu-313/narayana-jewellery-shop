import { signInWithEmailAndPassword } from "firebase/auth";
import{ useState } from "react";
import { auth } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Navbar3 from "../../components/Navbar3"
import '../../styles/LoginForm.css'
import BottomNavbar from "../BottomNavbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      navigate("/")

      
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
    <Navbar3 />
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        Don't have an account?  <a href="/signup">Sign Up</a>
      </p>
    </form>

    <BottomNavbar />
    </>
  );
}

export default Login;