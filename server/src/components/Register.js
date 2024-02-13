import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './mix.css';
import { Password } from '@mui/icons-material';

function Register() {

    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setcPassShow] = useState(false);
    const [impval, setImpval] = useState({
        fname:"",
        email:"",
        password:"",
        cpassword:""
    });
    //console.log(impval);
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

    const addUserdata = async(e) =>{
        e.preventDefault();
        const {fname,email,password,cpassword} = impval;
        if(fname === ""){
            alert("Please enter your Name");
        }else if(email === ""){
            alert("Please enter your Email");
        }else if(!email.includes("@")){
            alert("Enter valid Email");
        }else if(password === ""){
            alert("Enter Password");
        }else if(password.length < 6){
            alert("Password must be 6 char");
        }else if(cpassword === ""){
            alert("Confirm your password")
        }else if(cpassword.length < 6){
            alert("Password must be 6 char");
        }else if(password !== cpassword){
            alert("Password and Confirm Password not match");
        }else{
            //console.log("User Registration Done");
            const data = await fetch("http://localhost:3006/register",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    fname,email,password,cpassword
                })
            });
            const res = await data.json();
            //console.log(res.status);
            if (res.status === 201){
                alert('user registration done');
                setImpval({...impval,fname:"",email:"",password:"",cpassword:""});
            }
        }
    }

  return (
    <React.Fragment>
        <section>
            <div className='form_data'>
                <div className='form_heading'>
                        <h1>Sign Up</h1>
                        <p>Welcome, signup</p>
                </div>

                <form>
                    <div className='form_input'>
                        <lebel>Name</lebel>
                        <input onChange={setVal} value={impval.fname} type='text' name='fname' id='fname' placeholder='Enter your Name' />
                    </div>
                    <div className='form_input'>
                        <lebel>Email</lebel>
                        <input onChange={setVal} value={impval.email}  type='email' name='email' id='email' placeholder='Enter your Email' />
                    </div>
                    <div className='form_input'>
                        <lebel>Password</lebel>
                        <div className='two'>
                        <input onChange={setVal} value={impval.password}  type={!passShow ? "password" : "text"} name='password' id='password' placeholder='Enter your Password' />
                        <div className='showpass' onClick={()=>setPassShow(!passShow)}>
                            {!passShow ? "Show" : "Hide"}
                        </div>
                        </div>
                    </div>
                    <div className='form_input'>
                        <lebel>Confirm Password</lebel>
                        <div className='two'>
                        <input onChange={setVal} value={impval.cpassword} type={!cpassShow ? "password" : "text"} name='cpassword' id='cPassword' placeholder='Confirm your Password' />
                        <div className='showpass' onClick={()=>setcPassShow(!cpassShow)}>
                            {!cpassShow ? "Show" : "Hide"}
                        </div>
                        </div>
                    </div>
                    <button onClick={addUserdata} className='btn'>Sign Up</button>
                    <p>You have Account? <NavLink to="/">Log In</NavLink></p>
                </form>
            </div>
        </section>
    </React.Fragment>
  )
}

export default Register;