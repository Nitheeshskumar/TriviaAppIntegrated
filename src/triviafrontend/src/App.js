import React from 'react';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Login from './components/Login'
import './App.css';
import API from './api/quizQuestions';
import {shuffleArray} from './components/Shared/Utils'
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


  const loadinitialData = () => {
    setQuestionId(1); setCounter(0); setQuestion(''); setAnswerOptions([]); setAnswer(''); result.current=0; setQuizQuestions([])
    listquestions()
      .then((response) => {
        const shuffledAnswerOptions = response.data.map(question =>
          shuffleArray(question.alternatives)
        );
        setQuestion(response.data[0].description);
        setAnswerOptions(shuffledAnswerOptions[0]);
        setQuizQuestions(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  React.useEffect(() => {
    loadinitialData()
  }, [])

  const handleNext = () => {
    if (questionId < quizQuestions.length) {
      setTimeout(() => setNextQuestion(), 300);
    } else {
      let body = {...user,attempts:user.attempts+1,score:Math.max(result.current,user.score)}
     updateScore(body).then(res=>{
      }).catch(e=>console.log(e))


      setTimeout(() => {
        setCounter((counter) => counter + 1);
        setQuestionId((questionIdt) => questionIdt + 1);
      }, 300);
    }
  }

  const handleAnswerSelected = (event) => {
    checkanswer({choice:event.currentTarget.value,_id:quizQuestions[counter]._id}).then(res=>{
     if(res.data.answer === true){
      result.current = result.current+1;
     }
    }).catch(e=>console.log(e))
    // if (quizQuestions[counter].alternatives.find(e => e.isCorrect).text === event.currentTarget.value) {
    //   result.current = result.current+1;
    // }
    setAnswer(event.currentTarget.value);
    setTimeout(()=>{
      handleNext()
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
    console.log(data)
      setIsLoggedIn(true);
      setUser(data);
    }
  const renderResult = () => {
    return <Result quizResult={result.current} loadinitialData={loadinitialData} />

  }
  const gameComp = () => questionId > quizQuestions.length ? renderResult() : renderQuiz();
  const loginComp = () => <Login login={loginAction} />;
  return (
   <>
      {!isLoggedin ? loginComp() : gameComp()}
      </>

  );

}

export default App;
