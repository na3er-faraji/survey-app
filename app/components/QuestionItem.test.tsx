import { fireEvent, render } from "@testing-library/react";
import QuestionItem from "./QuestionItem";

describe("Alert Component", () => {
  const question = {
    name: "marital",
    title: "What's your marital status?",
    question_type: "single_select",
    possible_answers: ["Single", "Married", "Divorced"],
    acceptable_answers: ["Married"],
  };

  test("renders label and select box properly", () => {
    const { getByText } = render(
      <QuestionItem question={question} onSelect={jest.fn()} />
    );

    const labelElement = getByText(question.title);
    expect(labelElement).toBeInTheDocument();

    question.possible_answers.forEach((option) => {
      const optionElement = getByText(option);
      expect(optionElement).toBeInTheDocument();
    });
  });

  test("user can select an option", () => {
    const { getByTestId } = render(
      <QuestionItem question={question} onSelect={() => {}} />
    );

    const selectElement = getByTestId("questions-select") as HTMLInputElement;

    fireEvent.change(selectElement, { target: { value: "Divorced" } });
    expect(selectElement.value).toBe("Divorced");
  });
});
