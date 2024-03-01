import PrescreenQuestions from "./PrescreenQuestions";

export default interface Question {
  id: string;
  link: string;
  prescreen_questions: PrescreenQuestions[];
}
