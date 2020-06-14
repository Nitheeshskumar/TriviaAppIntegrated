import React from 'react';
import {Modal,Button} from 'react-bootstrap';

const  ModalDialog = (props)=> {
    console.log(props)
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.heading}</h4>
          <p>
    {props.content}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Continue</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  export default ModalDialog;