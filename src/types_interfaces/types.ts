import { string } from "yup";
// import { QuestionOption } from "./interfaces";
import { OptionBase } from "chakra-react-select";


export type GenericDict = {
  value: number
  label: string
}

export type JsonProps<T> = {
  items: T[];
};

export type QuestionBase = {
  id: number, 
  subject: string 
};

export type DemographicQuestion = QuestionBase & {
  options: Array<string>
};

export type BHIQuestion = QuestionBase & {
  dimension: string, 
  sub_dimension: string, 
  is_score_rev: boolean
};

export type SelfDetQuestion = QuestionBase & {
  dimension: string, 
  is_score_rev: boolean
}

export type PrefGamesQuestion = QuestionBase

export type FormItem = {
  id: number,
  selectedOption: QuestionOption | QuestionOption[]
};

//Question Options
export type QuestionOption = OptionBase & {
  label: string;
  value: number;
}

export type SelectedOption = OptionBase  &{
  label: QuestionOption[];
  value: number;
}

export type SurveyQuestions = {
  demographics: DemographicQuestion[],
  personality: BHIQuestion[],
  self_determination: SelfDetQuestion[],
  preferred_games: PrefGamesQuestion[]
}

export type SurveyAnswers = {
  demographics: FormItem[],
  personality: FormItem[],
  self_determination: FormItem[]
  preferred_games: FormItem[]
}

export type GameElemMech = {
  id: number,
  title: string,
  elements: string[],
  mechanics: string[]
}

export type GameProps = {
  id: number, 
  name: string,
  url: string,
  cover: {
    id: number,
    url: string,
    height: number,
    width: number
  }
};

export type CoverProps = Array<{
  id: number,
  url: string
}>;

export type GemProps = Array<{
  id: number,
  title: string,
  publisher: string,
  publish_date: number,
  elements: string[],
  mechanics: string[]
}>

export type TestScore = { 
  dimension: string, 
  score: number 
};