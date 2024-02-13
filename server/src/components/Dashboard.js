import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./Context/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Dashboard() {
  const [data, setData] = useState(false);
  const { loginData, setLoginData } = useContext(LoginContext);
  //console.log(loginData.validUserOne?.email);
  const navigate = useNavigate();

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
        navigate("*");
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>User Email : {loginData ? loginData.validUserOne.email : ""} </h1>
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

export default Dashboard;
