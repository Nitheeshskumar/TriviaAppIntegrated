import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'react-bootstrap';
import API from '../api/quizQuestions'
const {listdashboard}=API;
function Result(props) {
const [dashboard,setDashboard] = React.useState([])
React.useEffect(()=>{
  listdashboard().then(res=>{
    setDashboard(res.data)
  }).catch(e=>console.log(e))
},[])

  return (
    <>
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
{dashboard.map((e,i)=>{
  return <tbody key={i}>
  <tr>
  <td>{i+1}</td><td>{e.name}</td><td>{e.score}</td><td>{e.attempts}</td>
  </tr>
  </tbody>

})}
 </Table>
      </div>
    </>
  );
}

Result.propTypes = {
  quizResult: PropTypes.number
};

export default Result;
