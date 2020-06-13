import React from "react";
import API from '../api/quizQuestions';
import {shuffleArray} from '../components/Shared/Utils'
import {Form,Button,Col} from 'react-bootstrap';
const {createQn}=API
class QuestionForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {qstn: '',
      opt1:'',opt2:'',opt3:'',opt4:'',tips:'',validated:false
    };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
      const form = event.currentTarget;
      event.preventDefault();
      event.stopPropagation();
      let continues = true;
      if (form.checkValidity() === false) {
        continues = false
      }

      if(continues){
        let payload ={"description":this.state.qstn,"tips":this.state.tips,
        "alternatives":shuffleArray([this.state.opt1,this.state.opt2,this.state.opt3,this.state.opt4]),
        "correct":this.state.opt4}
       createQn(payload).then(res=>{
        this.setState({validated:false});
            this.setState({qstn: '',
            opt1:'',opt2:'',opt3:'',opt4:'',tips:''
          })
        })
      }
      this.setState({validated:true});



    }

    render() {
      return (

      //   <CSSTransitionGroup
      //   className="container result"
      //   component="div"
      //   transitionName="fade"
      //   transitionEnterTimeout={800}
      //   transitionLeaveTimeout={500}
      //   transitionAppear
      //   transitionAppearTimeout={500}
      // >


<Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Question</Form.Label>
          <Form.Control
            required
            type="text"
            name = 'qstn'
            onChange = {this.handleChange}
            placeholder="Question"
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Option A</Form.Label>
          <Form.Control
            required
            name = 'opt1'
            type="text"
            placeholder="Option A"
            onChange = {this.handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Option B</Form.Label>
          <Form.Control
            required
            type="Option B"
            name = 'opt2'
            placeholder="text"
            onChange = {this.handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom04">
          <Form.Label>Option C</Form.Label>
          <Form.Control
            required
            type="Option C"
            name = 'opt3'
            placeholder="text"
            onChange = {this.handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom05">
          <Form.Label>Option D</Form.Label>
          <Form.Control
            required
            type="Option D"
            name = 'opt4'
            placeholder="text"
            onChange = {this.handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom06">
          <Form.Label>Tips</Form.Label>
          <Form.Control
            required
            type="Tips"
            name = 'tips'
            placeholder="text"
            onChange = {this.handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4"> <Button type="submit">Create</Button></Form.Group>
        </Form>














/*{
        <form onSubmit={this.handleSubmit}>
          <label>
            Question:{' '}
            <input type="text" name = "qstn" value={this.state.qstn} onChange={this.handleChange} />
          </label><br></br><br></br>
          <label>
            Opt 1:{' '}
            <input type="text" name = "opt1" value={this.state.opt1} onChange={this.handleChange} />
          </label><br></br><br></br>
          <label>
            Opt 2:{' '}
            <input type="text" name = "opt2" value={this.state.opt2} onChange={this.handleChange} />
          </label><br></br><br></br>
          <label>
            Opt 3:{' '}
            <input type="text" name = "opt3" value={this.state.opt3} onChange={this.handleChange} />
          </label><br></br><br></br>
          <label>
            Opt 4:{' '}
            <input type="text" name = "opt4" value={this.state.opt4} onChange={this.handleChange} />
          </label><br></br><br></br>
          <label>
            Tips:{' '}
            <input type="text" name = "tips" value={this.state.tips} onChange={this.handleChange} />
          </label><br></br><br></br>
          <input type="submit" value="Submit" />
        </form> }*/
        // </CSSTransitionGroup>
      );
    }
  }
  export default QuestionForm



