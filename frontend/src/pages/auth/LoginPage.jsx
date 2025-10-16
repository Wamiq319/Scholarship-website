import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@/redux/slices/resourcesSLice";
import { Navbar, Footer } from "@/components/layout";
import Button from "@/components/ui/Button";
import InputField from "@/components/input/InputField";
import logo from "@/assets/LOGO.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.resources);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      navigate("/admin");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Left Column */}
          <div className="hidden md:flex w-1/2 bg-gradient-to-br from-gray-100 to-gray-200 items-center justify-center flex-col p-12 rounded-l-2xl">
            <div className="bg-white rounded-full p-4 shadow-md mb-6">
              <img src={logo} alt="Logo" className="w-24 h-24 object-contain" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3 text-center">
              Welcome Back!
            </h1>
            <p className="text-center text-gray-600 leading-relaxed max-w-xs">
              Log in to access your scholarship dashboard, manage applications,
              and explore new opportunities easily.
            </p>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
              Login to Your Account
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <InputField
                label="Email"
                name="email"
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />

              <Button
                type="submit"
                color="blue"
                variant="filled"
                rounded
                className="w-full py-3 text-lg"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Logging in..." : "Login"}
              </Button>

              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

              <div className="text-center pt-4">
                <p className="text-gray-600 mb-2">Don’t have an account?</p>
                <Button
                  type="button"
                  variant="outlined"
                  color="blue"
                  rounded
                  className="px-6 py-2"
                  onClick={handleRegister}
                >
                  Register as Student
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
