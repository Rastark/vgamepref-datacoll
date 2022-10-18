export type GameProps = Array<{ id: number, name: string }>;

export type QuestionProps<T> = {
  items: T[];
};

export type QuestionBase = {
  id: string, 
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

export type FormItem = {
  id: number,
  selectedOption: string
};

export type QuestionnaireAnswers = {
  demographics: FormItem[],
  answers: FormItem[]
}