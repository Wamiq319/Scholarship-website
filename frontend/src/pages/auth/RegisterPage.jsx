import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer, Dropdown } from "@/components";
import { Button } from "@/components";
import logo from "@/assets/LOGO.png";
import { registerUser } from "@/redux/slices/resourcesSLice";
import { InputField } from "@/components";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT",
    department: "",
    rollNo: "",
    profile: {
      phone: "",
      address: "",
      gpa: "",
      familyIncome: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.resources);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("profile.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        profile: { ...formData.profile, [field]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const result = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(result)) {
      const role = result.payload.data.role;

      if (role === "ADMIN") navigate("/admin");
      else if (role === "STUDENT") navigate("/student");
      else if (role === "COMMITTEE") navigate("/committee");
      else navigate("/login"); // fallback
    }
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
              Create an Account!
            </h1>
            <p className="text-center text-gray-600 leading-relaxed max-w-xs">
              Register to access the Scholarship Zone platform and start
              applying for scholarships online.
            </p>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
              Register as Student / Committee
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <InputField
                label="Full Name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />

              <InputField
                label="Email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />

              <InputField
                label="Password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
              />

              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
              />

              <InputField
                label="Department"
                name="department"
                type="text"
                value={formData.department}
                onChange={handleChange}
                placeholder="Enter your department"
              />

              <InputField
                label="Roll Number"
                name="rollNo"
                type="text"
                value={formData.rollNo}
                onChange={handleChange}
                placeholder="Enter your roll number"
              />

              <InputField
                label="Phone Number"
                name="profile.phone"
                type="text"
                value={formData.profile.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />

              <InputField
                label="Address"
                name="profile.address"
                type="text"
                value={formData.profile.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />

              <InputField
                label="GPA"
                name="profile.gpa"
                type="number"
                value={formData.profile.gpa}
                onChange={handleChange}
                placeholder="Enter your GPA"
              />

              <InputField
                label="Family Income"
                name="profile.familyIncome"
                type="number"
                value={formData.profile.familyIncome}
                onChange={handleChange}
                placeholder="Enter family income"
              />

              <Button
                type="submit"
                color="blue"
                variant="filled"
                rounded
                className={`w-full py-3 text-lg ${
                  status === "loading" ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleSubmit}
              >
                {status === "loading" ? "Creating account..." : "Register"}
              </Button>

              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

              <div className="text-center pt-4">
                <p className="text-gray-600 mb-2">Already have an account?</p>
                <Button
                  type="button"
                  variant="outline"
                  color="blue"
                  rounded
                  className="px-6 py-2"
                  onClick={() => navigate("/login")}
                >
                  Back to Login
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

export default RegisterPage;
