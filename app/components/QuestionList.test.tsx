import React from "react";
import { render, fireEvent } from "@testing-library/react";
import QuestionList from "../components/QuestionList";

describe("QuestionList", () => {
  test("show congrats message when answer is correct", () => {
    // Mock questions data
    const questions = [
      {
        name: "marital",
        title: "What's your marital status?",
        question_type: "single_select",
        possible_answers: ["Single", "Married", "Divorced"],
        acceptable_answer: ["Married"],
      },
    ];

    const { getByTestId, getByText } = render(
      <QuestionList questions={questions} showNextSurvey={() => {}} />
    );

    const selectElement = getByTestId("questions-select") as HTMLInputElement;
    fireEvent.change(selectElement, { target: { value: "Married" } });

    const button = getByText("Check Answers");
    fireEvent.click(button);

    expect(
      getByText("Congrats! your answer are accepted... 😊")
    ).toBeInTheDocument();
  });
});
