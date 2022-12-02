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

export type FormItem = {
  id: number,
  selectedOption: string
};

export type QuestionnaireAnswers = {
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

export type GameProps = 
  Array<{ id: number, name: string }>;

export type GemProps = Array<{
  id: number,
  title: string,
  publisher: string,
  publish_date: number,
  elements: string[],
  mechanics: string[]
}>
