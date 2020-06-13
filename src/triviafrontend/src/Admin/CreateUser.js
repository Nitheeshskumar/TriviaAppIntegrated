import React from 'react';
import {Form,Button,Col} from 'react-bootstrap';
import API from '../api/quizQuestions'
const {createUser} = API;
function Signup(props) {
  const [validated, setValidated] = React.useState(false);
  const [newData,setNewData] = React.useState({name:'',email:'',password:''})

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
    if(continues){
        createUser(newData).then(res=>console.log(res)).catch(e=>console.log(e));
    }
    setValidated(true);

  };
  const handleChange = e=>{
    const value  = e.target.value;
    let newDatatemp = {...newData,[e.target.name]:value}
    setNewData(newDatatemp);
    }


  return (
    <>
      <br></br>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Player Name</Form.Label>
          <Form.Control
            required
            type="text"
            name = 'name'
            onChange = {handleChange}
            placeholder="Player Name"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            name = 'email'
            type="text"
            placeholder="Email"
            onChange = {handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name = 'password'
            placeholder="Password"
            onChange = {handleChange}
          />
        </Form.Group>
        <Button type="submit">Login</Button>
        </Form>
    </>
  );
}


export default Signup;
