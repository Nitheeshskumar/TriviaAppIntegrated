import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

function Quiz(props) {
  return (
    <CSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div key={props.questionId}>
        <div className="questionCount">
          Question <span>{props.questionId}</span> of <span>{props.questionTotal}</span>
        </div>
        <h2 className="question">{props.question}</h2>
        <ul className="answerOptions">
          {props.answerOptions.map(key=>
      <li className="answerOption" key= {key._id}>
      <input
        type="radio"
        className="radioCustomButton"
        name="radioGroup"
        checked={key.text === props.answer}
        id={key.text}
        value={key.text}
        disabled={props.answer}
        onChange={props.onAnswerSelected}
      />
      <label className="radioCustomLabel" htmlFor={key.text}>
        {key.text}
      </label>
    </li>
      )}
        </ul>
      </div>
    </CSSTransitionGroup>
  );
}

Quiz.propTypes = {
  answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default Quiz;
