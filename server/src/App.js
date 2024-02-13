import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Error from "./components/Error";
import { Routes, Route, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { LoginContext } from "./components/Context/Context";

function App() {
  const [data, setData] = useState(false);
  const navigate = useNavigate();
  const { loginData, setLoginData } = useContext(LoginContext);

  const dashboardValid = async () => {
    try {
      let token = localStorage.getItem("userDataToken");
      //console.log(token);
      const res = await fetch("http://localhost:3006/validuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      //console.log(data);

      if (data.status == 401 || !data) {
        console.log("User Not Valid");
      } else {
        console.log("User Veryfied");
        setLoginData(data);
        navigate("/dash");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      dashboardValid();
      setData(true);
    }, 2000);
  }, []);

  return (
    <React.Fragment>
      {data ? (
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="*" element={<Error />} />
          </Routes>{" "}
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </React.Fragment>
  );
}

export default App;
