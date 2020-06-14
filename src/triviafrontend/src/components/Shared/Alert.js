import React from 'react';
import {Alert,Button} from 'react-bootstrap';


const AlertDismissible=(props)=> {
  console.log(props.show)
    return (
      <>
        <Alert show={props.show} variant={props.variant} >
          <Alert.Heading>{props.variant === 'danger'?'Oops yaar !!':'Are Waaah !!'}</Alert.Heading>
          <p>
           {props.content}
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => {props.closeAlert()}} variant="outline-success">
              Close me yaar!
            </Button>
          </div>
        </Alert>
      </>
    );
  }

  export default AlertDismissible;