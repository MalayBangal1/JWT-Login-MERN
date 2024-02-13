import React, { useContext, useState } from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import "./mix.css";
import { LoginContext } from './Context/Context';

function Login() {

    const navigate = useNavigate();
    const { loginData, setLoginData } = useContext(LoginContext);

    const [passShow, setPassShow] = useState(false);
    const [impval, setImpval] = useState({
        email:"",
        password:""
    });
    const setVal = (e) =>{
        //console.log(e.target.value);
        const {name, value} = e.target;
        setImpval(()=>{
            return{
                ...impval,
                [name]:value
            }
        })
    };
    const addUserdata = async (e) =>{
        e.preventDefault();
        const {email,password} = impval;
        if(email === ""){
            alert("Please enter your Email");
        }else if(!email.includes("@")){
            alert("Enter valid Email");
        }else if(password === ""){
            alert("Enter Password");
        }else{
            //console.log("User LogIn Done");
            const data = await fetch("http://localhost:3006/login",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email,password
                })
            });
            const res = await data.json();
            //console.log(res);
            if (res.status === 201){
                console.log("User Login");
                localStorage.setItem("userDataToken",res.result.token);
                navigate('/dash');
                setImpval({...impval,email:"",password:""});
            }
        }
    }

  return (
    <React.Fragment>
        <section>
            <div className='form_data'>
                <div className='form_heading'>
                        <h1>Welcome back, Log In</h1>
                        <p>Welcome</p>
                </div>

                <form>
                    <div className='form_input'>
                        <lebel>Email</lebel>
                        <input onChange={setVal} value={impval.email} type='email' name='email' id='email' placeholder='Enter your Email' />
                    </div>
                    <div className='form_input'>
                        <lebel>Password</lebel>
                        <div className='two'>
                        <input onChange={setVal} value={impval.password} type={!passShow ? "password" : "text"} name='password' id='password' placeholder='Enter your Password' />
                        <div className='showpass' onClick={()=>setPassShow(!passShow)}>
                            {!passShow ? "Show" : "Hide"}
                        </div>
                        </div>
                    </div>
                    {
                        loginData?(
                            <button disabled={true} onClick={addUserdata} className='btn'>Login</button>
                        ):(
                            <button onClick={addUserdata} className='btn'>Login</button>
                        )
                    }
                    <p>Don't have Account? <NavLink to="/register">Sign Up</NavLink> </p>
                </form>
            </div>
        </section>
    </React.Fragment>
  )
}

export default Login;