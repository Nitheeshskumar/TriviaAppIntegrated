import React from 'react';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Login from './components/Login'
import './App.css';
import API from './api/quizQuestions';
import {shuffleArray} from './components/Shared/Utils';
import  ModalDialog from './components/Shared/Modal';
const {listquestions,updateScore,checkanswer} = API
const App = props => {

  const [counter, setCounter] = React.useState(0)
  const [questionId, setQuestionId] = React.useState(1)
  const [question, setQuestion] = React.useState('')
  const [answerOptions, setAnswerOptions] = React.useState([])
  const [answer, setAnswer] = React.useState('')
  const result = React.useRef(0)
  const [quizQuestions, setQuizQuestions] = React.useState([]);
  const [isLoggedin, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [show,setShow] =React.useState(false)
  const responses= React.useRef([])
  const ModalProps = React.useRef({content:'',heading:'',title:''})

  const loadinitialData = (data=user) => {
    setQuestionId(1); setCounter(0); setQuestion(''); setAnswerOptions([]); setAnswer(''); result.current=0; setQuizQuestions([])
    listquestions()
      .then((response) => {
        const shuffledAnswerOptions = response.data.map(question =>
          shuffleArray(question.alternatives)
        );
        setQuestion(response.data[0].description);
        setAnswerOptions(shuffledAnswerOptions[0]);
        if(data.email !== 'trial@petta.in'){
          setQuizQuestions(response.data)
        }else{
          setQuizQuestions(response.data.slice(0,3))
        }

      })
      .catch(function (error) {
        console.log(error);
      })
  }

const getresponsesArr = ()=>{
let arr = user.responses;
arr.push(responses.current)
return responses.current;
}
  const handleNext = () => {
    if (questionId < quizQuestions.length) {
      setTimeout(() => setNextQuestion(), 300);
    } else {
      let body = {...user,attempts:user.attempts+1,score:Math.max(result.current,user.score),responses:getresponsesArr()}
      debugger
     updateScore(body).then(res=>{
      }).catch(e=>console.log(e))


      setTimeout(() => {
        setCounter((counter) => counter + 1);
        setQuestionId((questionIdt) => questionIdt + 1);
      }, 300);
    }
  }
  const closeAlert = ()=>{
    setShow(false);
    handleNext()
  }
  const handleAnswerSelected = (event) => {
    let value = event.currentTarget.value;
    responses.current.push(quizQuestions[counter].description+"="+value)
    checkanswer({_id:quizQuestions[counter]._id}).then(res=>{
     if(res.data.correct === value){
      result.current = result.current+1;
     ModalProps.current = {content:res.data.tips, heading:res.data.correct,title:'Yohoo. You are a Genuis',className:''}

     }else{
      ModalProps.current = {content:res.data.tips,heading:res.data.correct,title:'Oops. New addition to your GK?',className:"my-modal"}
     }


     setShow(true);
    }).catch(e=>console.log(e))
    // if (quizQuestions[counter].alternatives.find(e => e.isCorrect).text === event.currentTarget.value) {
    //   result.current = result.current+1;
    // }
    setAnswer(event.currentTarget.value);
    setTimeout(()=>{
     // handleNext()
    },700)
  }


  const setNextQuestion = () => {
    const counters = counter + 1;
    const questionIdt = questionId + 1;
    setCounter(counters);
    setQuestionId(questionIdt);
    setQuestion(quizQuestions[counters].description);
    setAnswerOptions(quizQuestions[counters].alternatives)
    setAnswer('')
  }
  const renderQuiz = () => {
    return (
      <Quiz
        answer={answer}
        answerOptions={answerOptions}
        questionId={questionId}
        question={question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={handleAnswerSelected}
        handleNext={handleNext}
      />
    );
  }
  const loginAction = (data) => {
    console.log(data);
    loadinitialData(data);
    setTimeout(() => {
      setIsLoggedIn(true);
      setUser(data);
    }, 300);


    }
  const renderResult = () => {
    return <Result quizResult={result.current} loadinitialData={loadinitialData} />

  }
  const gameComp = () => questionId > quizQuestions.length ? renderResult() : renderQuiz();
  const loginComp = () => <Login login={loginAction} />;
  return (
   <>
      {!isLoggedin ? loginComp() : gameComp()}
       {/* eslint-disable-next-line */}
      {show &&<ModalDialog className={ModalProps.current.className} show ={show} {...ModalProps.current} onHide={closeAlert}/> }
      </>

  );

}

export default App;
