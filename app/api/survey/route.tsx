import { NextRequest, NextResponse } from "next/server";
import searchSurveySchema from "../../schema/searchSurvey";
import dbConnect from "@/lib/dbConnect";
import Survey from "@/models/survey";
import { calculateAge } from "@/app/helper/util";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const gender = searchParams.get("gender");
  const birthDate = searchParams.get("birthDate");

  const validation = searchSurveySchema.safeParse({ gender, birthDate });
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const age = calculateAge(birthDate as unknown as Date);

  await dbConnect();

  const survey = await Survey.find({
    $and: [
      { "matching_profile.gender": gender },
      { "matching_profile.age": age },
    ],
  }).sort({ reward_amount: "desc" });

  return NextResponse.json(survey);
}
