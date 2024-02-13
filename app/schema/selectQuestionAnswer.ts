import { z } from "zod";

const selectQuestionAnswerSchema = z.object({
  answer: z.string(),
});

export default selectQuestionAnswerSchema;
