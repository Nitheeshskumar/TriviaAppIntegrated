import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

function Login(props) {
  return (
    <CSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div>
        Please Enter your name to continue
      </div>
      <br></br>
      <div>
            Player Name: <input type= "text" id ="name" name="name"></input><br></br>
            Player Email:  <input type= "text" id ="email" name="email"></input><br></br>

      <button  onClick={props.login}>Login</button>
      </div>
      <p style={{fontSize:12}}> * Email is only used to verify previous Players </p>
    </CSSTransitionGroup>
  );
}

Login.propTypes = {
    login: PropTypes.func.isRequired
};

export default Login;
