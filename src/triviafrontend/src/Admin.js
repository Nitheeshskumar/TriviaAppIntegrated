import React from "react";
import { CSSTransitionGroup } from 'react-transition-group';
import axios from 'axios'
class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {qstn: '',
      opt1:'',opt2:'',opt3:'',opt4:'',opt5:'',answer:''
    };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        debugger
      console.log('A name was submitted: ' + this.state);
      event.preventDefault();
      let payload ={"description":this.state.qstn,
      "alternatives":[
      {"text":this.state.opt1},
      {"text":this.state.opt2},
      {"text":this.state.opt3},
      {"text":this.state.opt4},
      {"text":this.state.opt5,
      "isCorrect":true}
      ],
      "correct":this.state.opt5}
      axios.post('https://agile-everglades-26580.herokuapp.com/questions',payload).then(res=>{
          this.setState({qstn: '',
          opt1:'',opt2:'',opt3:'',opt4:'',opt5:'',answer:''
        })
      })
    }

    render() {
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
            Opt 5:{' '}
            <input type="text" name = "opt5" value={this.state.opt5} onChange={this.handleChange} />
          </label><br></br><br></br>
          <input type="submit" value="Submit" />
        </form>
        </CSSTransitionGroup>
      );
    }
  }
  export default NameForm



