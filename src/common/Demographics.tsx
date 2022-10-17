import { Button, Flex, TagLabel } from "@chakra-ui/react";
import { GroupBase, OptionBase, Select } from "chakra-react-select";
import e from "cors";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DemographicOption } from "../types_interfaces/interfaces";
import { QuestionProps, DemographicQuestion, FormItem } from "../types_interfaces/types";
import useHasMounted from "../utils/hasMounted";


const Demographics: React.FC<{
  questionProps: QuestionProps<DemographicQuestion>, 
  showToggle: () => void,
  formData: (input: {
    show: boolean;
    formData: FormItem[];
}) => void
}> = (props) => {
  
  const questions = props.questionProps.items;
  console.log("questions", questions)

  const handleSubmit = () => {
    // alert('Your responses are ' + inputValues);
    // props.showToggle();
    props.showToggle()
    const updatedFormData: FormItem[] = inputValues.map((item, index) => ({
      id: index, 
      selectedOption: item.label
    }));
    console.log("updatedForm", updatedFormData);
    props.formData({show: false, formData: updatedFormData})
    // console.log("submitted value: ", );
  }

  const [inputValues, setValues] = useState(new Array<DemographicOption>(questions.length).fill({label: "", value: -1}));
  console.log(inputValues)
  console.log('qinitial', inputValues);

  const [currentQuestionId, setCurrentQuestionId] = useState(0);

  {/* Question change buttons logic */}
  const handlePrevQuestion = () => setCurrentQuestionId(Math.max(currentQuestionId - 1, 0));
  const handleNextQuestion = () => setCurrentQuestionId(Math.min(currentQuestionId + 1, questions.length-1));
  const currentQuestion = questions[currentQuestionId];

  const options = currentQuestion.options.map((q,i) => ({ label: q, value: i}));

  const changeValues = (value: DemographicOption | null) => {
    if (value) {
      let items = [...inputValues];
      let item = {...items[currentQuestionId]};
      item.label = value.label;
      item.value = value.value;
      items[currentQuestionId] = item;
      setValues(items)
      console.log('new_values', items)
    }
  }
  console.log('qfinal', inputValues);

  return (!useHasMounted ? <></> :
    <div className="question-card">
      <h1>Brief-HEXACO-Personality-Inventory</h1>
      <h3 className="question-text">{currentQuestion.subject}</h3>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <Select<DemographicOption, false, GroupBase<DemographicOption>>
          options={options}
          name="optionValue"
          value={inputValues[currentQuestionId] || null}
          placeholder="choose an option..."
          onChange={changeValues}
        />
        <Button onClick={handlePrevQuestion}>Prev</Button>
        <Button onClick={handleNextQuestion}>Next</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      {/* </form> */}
    </div>
  )
}

export default Demographics;