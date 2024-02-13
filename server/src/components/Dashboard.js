import { SettingsSystemDaydreamTwoTone } from '@mui/icons-material';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './Context/Context';

function Dashboard() {

  const {loginData,setLoginData} = useContext(LoginContext);
  //console.log(loginData.validUserOne?.email);
  const history = useNavigate();

  const dashboardValid = async ()=>{
    try {
      let token = localStorage.getItem("userDataToken");
    //console.log(token);
    const res = await fetch("http://localhost:3006/validuser",{
      method: "GET",
      headers: {
        "Content-Type":"application/json",
        "Authorization":token
      }
    })
    const data = await res.json();
    //console.log(data);
    if(data.status == 401 || !data){
      history("*");
    }else{
      setLoginData(data);
      history("/dash")
    }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(()=>{
        dashboardValid();
  },[]);

  return (
    <React.Fragment>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <h1>User Email : {loginData ? loginData.validUserOne.email : ""} </h1>
      </div>
    </React.Fragment>
  )
}

export default Dashboard;