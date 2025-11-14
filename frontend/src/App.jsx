import React from "react";
import AppRouter from "./Router";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { CheckCircle, XCircle } from "lucide-react";

function App() {
  return (
    <div className="App">
      <AppRouter />

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "12px",
            padding: "14px 18px",
            fontWeight: 500,
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          },
          success: {
            icon: <CheckCircle className="text-green-600" size={22} />,
            style: {
              background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
              color: "#065f46",
            },
          },
          error: {
            icon: <XCircle className="text-red-600" size={22} />,
            style: {
              background: "linear-gradient(135deg, #fee2e2, #fecaca)",
              color: "#7f1d1d",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
