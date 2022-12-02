import { Button, Flex, Progress, TagLabel } from "@chakra-ui/react";
import { GroupBase, OptionBase, Select } from "chakra-react-select";
import e from "cors";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { QuestionOption } from "../types_interfaces/interfaces";
import { JsonProps, DemographicQuestion, FormItem, SelfDetQuestion } from "../types_interfaces/types";
import useHasMounted from "../utils/hasMounted";
import { changeItemValuesById, handleFormSubmit } from "../utils/qre-hooks";
import LikertScale from "./LikertScale";
import NavButtons from "./NavButtons";


const SelfDetQre: React.FC<{
  questionProps: JsonProps<SelfDetQuestion>, 
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

  // Input state
  const [inputValues, setInputValues] = useState(new Array<QuestionOption>(questions.length).fill({label: "3", value: -1}));
  console.log(inputValues);
  console.log('qinitial', inputValues);

  // Current question state
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  
  const currentQuestion = questions[currentQuestionId];
  const isLastQuestion = currentQuestionId === questions.length-1;

  // Update inputValues dinamically on aswer change
  const changeValues = (newValue: string) => {
    return changeItemValuesById(
      currentQuestionId,
      {label: newValue, value: +parseInt(newValue)},
      inputValues,
      setInputValues
    )
  }

  // Render component
  return (!useHasMounted ? <></> :
    <div className="question-card">
      <h1>Basic Personality Needs Satisfaction and Frustration Scale</h1>
      <Progress value={((+currentQuestion.id + 1)/questions.length)*100}/>
      <h3 className="question-text">{currentQuestion.subject}</h3>
      <LikertScale value={ inputValues[currentQuestionId].label } 
        onChange={changeValues} 
      />
      <NavButtons 
          length={questions.length}
          currId={currentQuestionId}
          setCurrId={setCurrentQuestionId} 
      />

      { isLastQuestion 
        ? <Button onClick={handleSubmit}>
          Go to results
          </Button> 
        : <></>
      }
    </div>
  )
}

export default SelfDetQre;