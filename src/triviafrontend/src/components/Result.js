import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import axios from 'axios'
import {Table} from 'react-bootstrap'
function Result(props) {
const [dashboard,setDashboard] = React.useState([])
React.useEffect(()=>{
  axios.get('https://agile-everglades-26580.herokuapp.com/dashboard').then(res=>{
    setDashboard(res.data)
  }).catch(e=>console.log(e))
})

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
      {props.quizResult && <>
        <div>
        You Scored <strong>{props.quizResult}</strong>!
      </div>

      <button onClick = {props.loadinitialData}>Restart</button>
      </>}

      <div>
      <Table striped bordered hover style={{textAlign:"center"}}>
      <thead>
            <tr>
               <td colSpan = "4"> <strong>Score Dashboard</strong></td>
            </tr>
            <tr>
            <td>No.</td><td>Username</td><td>High Score</td><td>Attempts</td>
  </tr>
         </thead>
{(props.statistics||dashboard).map((e,i)=>{
  return <tbody key={i}>
  <tr>
  <td>{i+1}</td><td>{e.name}</td><td>{e.score}</td><td>{e.attempts}</td>
  </tr>
  </tbody>

})}
 </Table>
      </div>
    </CSSTransitionGroup>
  );
}

Result.propTypes = {
  quizResult: PropTypes.number
};

export default Result;
