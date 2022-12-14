import { Button, Progress, Flex, TagLabel } from "@chakra-ui/react";
import { GroupBase, OptionBase, Select } from "chakra-react-select";
import e from "cors";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { QuestionOption } from "../types_interfaces/interfaces";
import { JsonProps, DemographicQuestion, FormItem } from "../types_interfaces/types";
import useHasMounted from "../utils/hasMounted";
import { changeItemValuesById, handleFormSubmit } from "../utils/qre-hooks";
import NavButtons from "./NavButtons";


const DemographicQre: React.FC<{
  questionProps: JsonProps<DemographicQuestion>, 
  showToggle: () => void,
  formData: (
    input: {
    show: boolean;
    formData: FormItem[]
  }) => void
}> = (props) => {
  const questions = props.questionProps.items;
  console.log("questions", questions)

  // Update parent state on submit
  const handleSubmit = () => {
    return handleFormSubmit(props, inputValues);
  }

  const [inputValues, setInputValues] = useState(new Array<QuestionOption>(questions.length).fill({label: "", value: -1}));
  console.log(inputValues);
  console.log('qinitial', inputValues);

  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const currentQuestion = questions[currentQuestionId];
  const options = currentQuestion.options.map((q,i) => ({ label: q, value: i}));

  const isLastQuestion = currentQuestionId === questions.length-1;

  const changeValues = (newValue: QuestionOption | null) => {
    return changeItemValuesById(
      currentQuestionId,
      newValue,
      inputValues,
      setInputValues
    )
  }
  console.log('qfinal', inputValues);

  return (!useHasMounted ? <></> :
    <div className="question-card">
      <h1>Brief-HEXACO-Personality-Inventory</h1>
      <Progress value={((+currentQuestion.id + 1)/questions.length)*100}/>
      <h3 className="question-text">{currentQuestion.subject}</h3>
      <Select<QuestionOption, false, GroupBase<QuestionOption>>
        options={options}
        name="optionValue"
        value={ inputValues[currentQuestionId].label === "" 
          ? null 
          : inputValues[currentQuestionId] }
        placeholder="choose an option..."
        onChange={changeValues}
        isRequired={true}
      />
      <NavButtons 
        length={questions.length}
        currId={currentQuestionId}
        setCurrId={setCurrentQuestionId} 
      />
      { isLastQuestion 
        ? <Button 
            onClick={handleSubmit}>
              Go to next survey
          </Button> 
        : <></> 
      }
    </div>
  )
}

export default DemographicQre;