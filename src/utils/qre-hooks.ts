import { QuestionOption } from "../types_interfaces/interfaces";
import { FormItem } from "../types_interfaces/types";

export const handleFormSubmit = (props: any, localInput: any) => {
  // alert('Your responses are ' + inputValues);
  props.showToggle();
  const updatedFormData: FormItem[] = localInput.map((item: any, index: number) => ({
    id: index, 
    selectedOption: item.label
  }));
  console.log("updatedForm", updatedFormData);
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
    console.log('new_values', items)
  }
  console.log('qfinal', inputValues);
}
