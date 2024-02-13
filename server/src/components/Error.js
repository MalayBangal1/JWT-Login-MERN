import React from 'react';
import { NavLink } from 'react-router-dom';

function Error() {
  return (
    <React.Fragment>

      <div className='container'>
        <div style={{minHeight:"85%", display:"flex", justifyContent:"center",flexDirection:"column",alignItems:"center",}}>

          <img style={{width:"500px", marginBottom:"20"}}/>
          <h2>PAGE NOTE FOUND</h2>
          <NavLink to="/" className="btn btn-primary" style={{fontSize:18}}> Back To Home Page </NavLink>

        </div>

      </div>

    </React.Fragment>
  )
}

export default Error;