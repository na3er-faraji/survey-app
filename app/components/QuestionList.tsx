import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
import QuestionAnswer from "../Interface/QuestionAnswer";
import Alert from "./Alert";
import { getKeyByValue } from "../helper/util";
import { AlertType } from "../enum/AlertType";
import { AnswerStatus } from "../enum/AnswerStatus";
import PrescreenQuestions from "../Interface/PrescreenQuestions";

interface Props {
  questions: PrescreenQuestions[];
  showNextSurvey: () => void;
}

const QuestionList = ({ questions, showNextSurvey }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<QuestionAnswer[]>([]);
  const [answerAccepted, setAnswerAccepted] = useState<AnswerStatus>(
    AnswerStatus.None
  );

  useEffect(() => {
    setAnswerAccepted(AnswerStatus.None);
  }, [questions]);

  const handleSelect = (answer: QuestionAnswer) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [answer.name]: answer.selectedAnswer,
    }));
  };

  const handleCheckAnswer = () => {
    setAnswerAccepted(AnswerStatus.Accepted);
    questions.map((question) => {
      const item = getKeyByValue(selectedOptions, question.name);
      if (!question.acceptable_answer.some((e) => e === item)) {
        setAnswerAccepted(AnswerStatus.Rejected);
      }
    });

  };

  const handleNextSurvey = () => {
    setAnswerAccepted(AnswerStatus.None);
    showNextSurvey();
  };

  if (!questions || questions.length === 0) {
    return (
      <div>
        <Alert type={AlertType.Info} message="No survey was found!" />
      </div>
    );
  } else {
    return (
      <div className="w-3/4 bg-white px-4 pt-4 pb-4">
        <div>
          {questions.map((question) => {
            return (
              <QuestionItem
                key={question.name}
                question={question}
                onSelect={handleSelect}
              />
            );
          })}
        </div>
        <div className="mt-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
            onClick={handleCheckAnswer}
          >
            Check Answers
          </button>
        </div>
        {answerAccepted === AnswerStatus.Rejected && (
          <div>
            <Alert
              type={AlertType.Warning}
              message="Answers are not acceptable, click on the button to go to next survey!"
              showIcon={true}
            />
            <button className="btn btn-link" onClick={handleNextSurvey}>
              Next Survey
            </button>
          </div>
        )}
        {answerAccepted === AnswerStatus.Accepted && (
          <div>
            <Alert
              type={AlertType.Success}
              message="Congrats! your answer are accepted... 😊"
              showIcon={true}
            />
          </div>
        )}
      </div>
    );
  }
};

export default QuestionList;
