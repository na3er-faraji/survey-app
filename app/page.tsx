"use client";
import Filter from "./components/Filter";
import { useState } from "react";
import Question from "./Interface/Question";
import QuestionList from "./components/QuestionList";

const SurveyForm = () => {
  const [data, setData] = useState<Question[]>([]);
  const [surveyIndex, setSurveyIndex] = useState<number>(0);

  const showNextSurvey = () => {
    const maxSurvey = data.length;
    if (surveyIndex < maxSurvey) {
      setSurveyIndex(surveyIndex + 1);
    }
  };

  const onFilterSelected = (data: Question[]) => {
    setData(data);
    setSurveyIndex(0);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-3/4 bg-white shadow-md rounded px-4 pt-4 pb-4">
        <Filter onFilter={onFilterSelected} />
        <hr />
        <QuestionList
          questions={data[surveyIndex]?.prescreen_questions}
          showNextSurvey={showNextSurvey}
        />
      </div>
    </main>
  );
};

export default SurveyForm;
