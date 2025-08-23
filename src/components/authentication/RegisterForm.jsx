import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebaseConfig";
import "../../styles/RegisterForm.css";
import Navbar3 from '../../components/Navbar3'
import BottomNavbar from "../BottomNavbar";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // if (form.password.length < 6) {
        //     newErrors.password = "Password should be at least 6 characters.";
        // }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, form.email, form.password);
            navigate("/login");
        } catch (err) {
            console.error("Registration Error:", err);
            setError({ firebase: err.message });
        }
        setLoading(false);
    };

    return (
        <>
            <Navbar3 />
            <div className="signup-container">
                <div className="signup-form-wrapper">
                    <h2>Sign Up</h2>

                    {/* {errors.firebase && <div className="error-message">{errors.firebase}</div>} */}

                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                onChange={onChange}
                                value={form.firstName}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                onChange={onChange}
                                value={form.lastName}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={onChange}
                                value={form.email}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={onChange}
                                value={form.password}
                                required
                            />
                            {/* {newErrors.password && <div className="input-error">{newErrors.password}</div>} */}
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={onChange}
                                value={form.confirmPassword}
                                required
                            />
                            {error && <div className="input-error">{error}</div>}
                        </div>

                        <button type="submit" className="signup-btn" disabled={loading}>
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    </form>

                    <div className="login-link-container">
                        <p>
                            Already have an account?
                            <Link to='/login' className="login-link">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <BottomNavbar />
        </>
    );
};

export default RegisterForm;