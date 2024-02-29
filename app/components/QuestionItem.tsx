import React from "react";
import PrescreenQuestions from "../Interface/PrescreenQuestions";
import selectQuestionAnswerSchema from "../schema/selectQuestionAnswer";
import { z } from "zod";
import QuestionAnswer from "../Interface/QuestionAnswer";

interface Props {
  question: PrescreenQuestions;
  onSelect: (answer: QuestionAnswer) => void;
}
type QuestionItem = z.infer<typeof selectQuestionAnswerSchema>;

const QuestionItem = ({ question, onSelect }: Props) => {

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect({
      name: question.name,
      selectedAnswer: event.target.value,
    });
  };

  return (
    <div>
      <div className="mb-6">
        <label>{question.title}</label>
      </div>
      <div className="mb-6">
        <select
          className="select select-primary w-full max-w-xs"
          defaultValue={"default"}
          onChange={handleSelectChange}
          data-testid="questions-select"
        >
          <option value="default" disabled>
            Select an option
          </option>
          {question.possible_answers.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default QuestionItem;
