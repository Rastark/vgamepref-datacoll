import { Button, Flex, Progress } from "@chakra-ui/react";
import React, { useState } from "react";
import LikertScale from "./LikertScale";
import { JsonProps, BHIQuestion, FormItem } from "../types_interfaces/types";
import useHasMounted from "../utils/hasMounted";
import {v4 as uuidv4} from "uuid";
import NavButtons from "./NavButtons";
import { useChangeItemValuesById, useHandleFormSubmit } from "../utils/qre-hooks";
import { QuestionOption } from "../types_interfaces/interfaces";

const BhiQre: React.FC<{
  questionProps: JsonProps<BHIQuestion>, 
  showToggle: () => void,
  formData: (
    input: {
    show: boolean;
    formData: FormItem[]
  }) => void
}> = (props) => {
  const questions = props.questionProps.items;
  const uuid = uuidv4();
  
  // Update parent state on submit
  const handleSubmit = () => {
    return useHandleFormSubmit(props, inputValues);
  }
  
  const [inputValues, setInputValues] = useState(new Array<QuestionOption>(questions.length).fill({label: "3", value: -1}));
  console.log('qinitial', inputValues);

  const [currentQuestionId, setCurrentQuestionId] = useState(0);

  const currentQuestion = questions[currentQuestionId];
  const isLastQuestion = currentQuestionId === questions.length-1;
  
  const changeValues = (newValue: string) => {
    return useChangeItemValuesById(
      currentQuestionId,
      {label: newValue, value: +parseInt(newValue)},
      inputValues,
      setInputValues
    )
  }

  return (!useHasMounted 
    ? <></> 
    : <div className="question-card">
      <Flex height="20vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background="gray.100" p={12} rounded={6}>
            <h1>Brief-HEXACO-Personality-Inventory</h1>
            <Progress value={((+currentQuestion.id + 1)/questions.length)*100}/>
            <h3 className="question-text">{currentQuestion.subject}</h3>
            <LikertScale value={ inputValues[currentQuestionId].label } 
              onChange={changeValues} 
            />
        </Flex>
      </Flex>
      <NavButtons 
        length={questions.length}
        currId={currentQuestionId}
        setCurrId={setCurrentQuestionId} 
      />
      { isLastQuestion 
        ? <Button onClick={handleSubmit}>
          Go to next survey
          </Button> 
        : <></>
      }
      </div>
    )

}

export default BhiQre;