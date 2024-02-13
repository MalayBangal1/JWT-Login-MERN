import React, { useContext } from "react";
import "./header.css";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "./Context/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

function Header() {
  const { loginData, setLoginData } = useContext(LoginContext);
  //setLoginData("hello");
  //console.log(loginData);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = async ()=>{

    try {
      let token = localStorage.getItem("userDataToken");
    //console.log(token);
    const res = await fetch("http://localhost:3006/logout",{
      method: "GET",
      headers: {
        "Content-Type":"application/json",
        "Authorization":token,
        Accept:"application/json"
      },
      credentials:"include"
    })
    const data = await res.json();
    //console.log(data);
    if(data.status !== 201 ){
      console.log("error");
    }else{
      console.log("User Logout");
      localStorage.removeItem("userDataToken");
      setLoginData(false);
      navigate("/")
    }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  const goLogin = () =>{
    navigate('/');
  }

  const goDash = () =>{
    navigate('/dash')
  }

  const goError = ()=>{
    navigate('*');
  }

  return (
    <React.Fragment>
      <header>
        <nav>
          <h2>Hello</h2>
          <div className="avtar">
            {loginData.validUserOne ? (
              <Avatar
                onClick={handleClick}
                style={{
                  backgroundColor: "salmon",
                  fontWeight: "blod",
                  textTransform: "capitalize",
                }}
              >
                {loginData.validUserOne.fname[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar onClick={handleClick} style={{ backgroundColor: "blue" }}></Avatar>
            )}
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >

            {
              loginData.validUserOne ? (

                <div>
                  <MenuItem onClick={()=>{
                    handleClose()
                    goDash()
                  }}>Profile</MenuItem>
                  <MenuItem onClick={()=>{
                    logoutUser()
                    handleClose()
                    }}>Logout</MenuItem>
                </div>
              ): (
                <div>
                  <MenuItem onClick={()=>{
                    handleClose()
                    goError()}}>Profile</MenuItem>
                </div>
              )
            }
          </Menu>
        </nav>
      </header>
    </React.Fragment>
  );
}

export default Header;
