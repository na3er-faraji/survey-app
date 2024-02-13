import { z } from "zod";

const searchSurveySchema = z.object({
  gender: z.enum(["male", "female", "others"], {
    errorMap: () => {
      return { message: "You should select a gender" };
    },
  }),
  birthDate: z.coerce.date({
    errorMap: () => {
      return { message: "Invalid date" };
    },
  }),
});

export default searchSurveySchema;
