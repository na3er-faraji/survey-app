"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Alert from "./Alert";
import searchSurveySchema from "../schema/searchSurvey";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import Question from "../Interface/Question";
import { z } from "zod";
import { AlertType } from "../enum/AlertType";

interface Props {
  onFilter: (question: Question[]) => void;
}
type searchSurvey = z.infer<typeof searchSurveySchema>;

const Filter = ({ onFilter }: Props) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<searchSurvey>({
    resolver: zodResolver(searchSurveySchema),
  });

  const filterClick = async () => {
    setError("");
    onFilter([]);

    try {
      const data = getValues();
      setSubmitting(true);
      const res = await axios.get<Question[]>(
        `/api/survey?gender=${data.gender}&birthDate=${data.birthDate}`
      );
      onFilter(res.data);
    } catch (error) {
      setError("An unexpected error accured!");
    } finally {
      setSubmitting(false);
    }
  };

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <>
      <div>
        {error && (
          <Alert message={error} showIcon={true} type={AlertType.Error} />
        )}
      </div>
      <div className="grid grid-cols-4 w-3/4 bg-white  px-4 pt-4 pb-4">
        <div className="ml-2">
          <select
            {...register("gender")}
            className="select select-primary w-full max-w-xs"
            defaultValue={"default"}
          >
            <option value="default" disabled>
              What is your gender?
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          <ErrorMessage>{errors.gender?.message}</ErrorMessage>
        </div>
        <div className="ml-2">
          <input
            {...register("birthDate")}
            type="date"
            placeholder="Enter your birthdate"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <ErrorMessage>{errors.birthDate?.message}</ErrorMessage>
        </div>
        <div className="ml-2">
          <button
            onClick={filterClick}
            disabled={isSubmitting}
            className="btn btn-primary"
            // type="submit"
          >
            Search
            {isSubmitting && <Spinner />}
          </button>
        </div>
      </div>
    </>
  );
};

export default Filter;
