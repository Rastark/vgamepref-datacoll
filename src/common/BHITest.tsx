import { Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import LikertScale from "./LikertScale";
import { QuestionProps, BHIQuestion } from "../types_interfaces/types";
import useHasMounted from "../utils/hasMounted";
import {v4 as uuidv4} from "uuid";

const BHITest: React.FC<{questionProps: QuestionProps<BHIQuestion>, showToggle: () => void}> = (props) => {
  const questions = props.questionProps.items;
  const uuid = uuidv4()
  
  const handleSubmit = () => {
    // alert('Your responses are ' + inputValues);
    props.showToggle();
    console.log("submitted value: ", inputValues);
  }

  const [inputValues, setValues] = useState(questions.map(q => '3'));
  console.log('qinitial', inputValues);
  // const [selectedValue, setSelectedValue] = useState(null);

  const [currentQuestionId, setCurrentQuestionId] = useState(0);

  {/* Question change buttons logic */}
  const handlePrevQuestion = () => setCurrentQuestionId(Math.max(currentQuestionId - 1, 0));
  const handleNextQuestion = () => setCurrentQuestionId(Math.min(currentQuestionId + 1, questions.length-1));
  const currentQuestion = questions[currentQuestionId];
  
  const changeValues = (value: string) => {
    const newInputValues =
      inputValues.map((v, q) => {   
        if (q === currentQuestionId) {
          console.log('EQUAL',q,v, currentQuestionId);
          return value;
        }
        else {
          console.log('DIFFERENT',q,v, currentQuestionId);
          return v;
        }
      })
      setValues(newInputValues);
  }
  console.log('qfinal', inputValues);

  return (!useHasMounted ? <></> :
    <div className="question-card">
      <h1>Brief-HEXACO-Personality-Inventory</h1>
      <h3 className="question-text">{currentQuestion.subject}</h3>
      <LikertScale value={inputValues[currentQuestionId]} onChange={changeValues} />
      <Button onClick={handlePrevQuestion}>Prev</Button>
      <Button onClick={handleNextQuestion}>Next</Button>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default BHITest;