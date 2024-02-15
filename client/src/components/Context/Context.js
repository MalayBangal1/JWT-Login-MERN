import React, { Children, createContext, useState } from 'react';

export const LoginContext = createContext("");
//console.log(LoginContext);

const Context = ({children}) => {
    const [loginData,setLoginData] = useState("");
    //console.log(loginData);
  return (

    <React.Fragment>
        <LoginContext.Provider value={{loginData,setLoginData}}>
            {children}
        </LoginContext.Provider>
    </React.Fragment>
  )
}

export default Context;