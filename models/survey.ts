import mongoose from "mongoose";

export interface Survey extends mongoose.Document {
  id: String;
  reward_amount: Number;
  link: String;
  matching_profile: {
    gender: [String];
    age: [Number];
  };
  prescreen_questions: {
    name: String;
    title: String;
    question_type: String;
    possible_answers: [String];
    acceptable_answers: [String];
  };
}

const SurveySchema = new mongoose.Schema<Survey>(
  {
    id: String,
    reward_amount: Number,
    link: String,
    matching_profile: {
      gender: [String],
      age: [Number],
    },
    prescreen_questions: {
      name: String,
      title: String,
      question_type: String,
      possible_answers: [String],
      acceptable_answers: [String],
    },
  },
  { collection: "surveys" }
);

export default mongoose.models.Survey ||
  mongoose.model<Survey>("Survey", SurveySchema);
