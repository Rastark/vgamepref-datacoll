import { QuestionOption } from "../types_interfaces/types";
import { BHIQuestion, FormItem, SelfDetQuestion, TestScore } from "../types_interfaces/types";

export const handleFormSubmit = (props: any, localInput: any) => {
  props.showToggle();
  const updatedFormData: FormItem[] = localInput.map((item: any, index: number) => ({
    id: index, 
    selectedOption: item
  }));
  props.formData({show: false, formData: updatedFormData})
}

export const changeItemValuesById = (
  itemId: number,
  newValue: QuestionOption | null,
  inputValues: QuestionOption[],
  setValues: (newValues: QuestionOption[]) => void
  ) => {
  if (newValue) {
    let items = [...inputValues];
    let itemToChange = {...items[itemId]}
    itemToChange.label = newValue.label;
    itemToChange.value = newValue.value;
    items[itemId] = itemToChange;
    setValues(items)
  }
}

/* 
  input: questionnaire data, questionnaire answers.
  output: an object containing every dimension score, labeled by dimension.
  */ 
export const useCalcDimScores = (questions: BHIQuestion[] | SelfDetQuestion[], answers: FormItem[]) => {
  const dim_set= new Set<string>();
  questions.map(item => dim_set.add(item.dimension));

  //Initialize score array
  let scores: TestScore[] = [];
  dim_set.forEach(dim => scores.push({dimension: dim, score: 0}));

  scores.forEach(elem => 
    questions.filter(item => 
      item.dimension == elem.dimension).forEach(dim_item =>
        elem.score += parseInt(answers[dim_item.id].selectedOption.label)))
  return scores;
}