import React from 'react';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Login from './components/Login'
import './App.css';
import axios from 'axios'

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
  const [dashboard,setDashboard]=React.useState([]);


  const loadinitialData = () => {
    setQuestionId(1); setCounter(0); setQuestion(''); setAnswerOptions([]); setAnswer(''); result.current=0; setQuizQuestions([])
    axios.get('https://agile-everglades-26580.herokuapp.com/questions')
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

  const shuffleArray = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  const handleNext = () => {
    if (questionId < quizQuestions.length) {
      setTimeout(() => setNextQuestion(), 300);
    } else {
      let body = {...user,attempts:user.attempts+1,score:Math.max(result.current,user.score)}
      axios.put('https://agile-everglades-26580.herokuapp.com/user',body).then(res=>{

        axios.get('https://agile-everglades-26580.herokuapp.com/dashboard').then(res=>{
          setDashboard(res.data)
        }).catch(e=>console.log(e))
      }).catch(e=>console.log(e))


      setTimeout(() => {
        setCounter((counter) => counter + 1);
        setQuestionId((questionIdt) => questionIdt + 1);
      }, 300);
    }
  }

  const handleAnswerSelected = (event) => {
    if (quizQuestions[counter].alternatives.find(e => e.isCorrect).text === event.currentTarget.value) {
      result.current = result.current+1;
    }
    setAnswer(event.currentTarget.value);
    setTimeout(()=>{
      handleNext()
    },1000)
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
  const loginAction = () => {
   const {value:name} = document.getElementById('name');
   const {value:email} = document.getElementById('email');
   let body = {
     name:name,email:email
   }
   axios.put('https://agile-everglades-26580.herokuapp.com/user',body).then(res=>{
    setIsLoggedIn(true);
    setUser(res.data);
   }).catch(e=>console.log(e))

  }
  const renderResult = () => {
    return <Result quizResult={result.current} statistics={dashboard}loadinitialData={loadinitialData} />

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
