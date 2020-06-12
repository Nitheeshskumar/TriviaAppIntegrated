import React from 'react';
import PropTypes from 'prop-types';

function Login(props) {
  return (
    <>
      <div>
        Please Enter your name to continue
      </div>
      <br></br>
      <div>
            Player Name: <input type= "text" id ="name" name="name"></input><br></br>
            Player Email:  <input type= "text" id ="email" name="email"></input><br></br>
            Password:  <input type= "text" id ="password" name="password"></input><br></br>

      <button  onClick={props.login}>Login</button>
      </div>
      <p style={{fontSize:12}}> * Email is only used to verify previous Players </p>
    </>
  );
}

Login.propTypes = {
    login: PropTypes.func.isRequired
};

export default Login;
