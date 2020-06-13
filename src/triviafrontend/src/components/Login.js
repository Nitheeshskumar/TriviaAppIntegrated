import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Col } from 'react-bootstrap';
import API from '../api/quizQuestions';
import Alert from './Shared/Alert'
const {userlogin} = API;
function Login(props) {
  const [validated, setValidated] = React.useState(false);
  const [newData, setNewData] = React.useState({ name: '', email: '', password: '' })
  const [newName, setNewName] = React.useState(false);
  const [show,setShow] = React.useState(false);
const content = React.useRef('');
const variant = React.useRef('');

  const loginAction =()=>{
    userlogin(newData).then(res=>{
      if(res.data.user==='none'){
        content.current= "This Email doesn't exist in my Database";
        variant.current = 'danger';
        setShow(true)

      }else if(res.data.user ==='false'){
        content.current= "The password you entered is incorrect. Please Try again";
        variant.current = 'danger';
        setShow(true)

      }else if(res.data.email){
        props.login(res.data)
      }

     }).catch(e=>console.log(e))

  }
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    let continues = true;
    if (form.checkValidity() === false) {
      continues = false
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    event.stopPropagation();
    if (continues)loginAction();
    setValidated(true);

  };
  const handleChange = e => {
    const value = e.target.value;
    let newDatatemp = { ...newData, [e.target.name]: value }
    setNewData(newDatatemp);
  }
const closeAlert = ()=>{
  setShow(false)
}

  return (
    <>
      <br></br>
      <Form.Group as={Col} md="4" controlId="validationCustom01">
        {newName ? <>
          <Button onClick={() => setNewName(false)}>Use Old Name</Button>
          <Form.Control
            required
            type="text"
            name='name'
            onChange={handleChange}
            placeholder="Player Name"
          />

        </>
          :
          <Button onClick={() => setNewName(true)}>Use New Name</Button>}
      </Form.Group>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>

        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            name='email'
            type="text"
            placeholder="Email"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name='password'
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4"> <Button type="submit">Login</Button>
        </Form.Group>

      </Form>
      {show &&<Alert content={content.current} show={show} variant={variant.current} closeAlert={closeAlert}/> }

    </>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired
};

export default Login;
