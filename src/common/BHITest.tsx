import { Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import LikertScale from "./LikertScale";
import { QuestionProps } from "../types/types";

const BHITest: React.FC<QuestionProps> = (props: QuestionProps) => {
  const questions = props.items;

  const handleSubmit = () => {
    alert('Your responses are ' + inputValues);
  }

  const [inputValues, setValues] = useState(questions.map(q => '3'));
  console.log('qinitial', inputValues);
  // const [selectedValue, setSelectedValue] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  {/* Question change buttons logic */}
  const prevQuestion = () => setCurrentQuestion(Math.max(currentQuestion - 1, 0));
  const nextQuestion = () => setCurrentQuestion(Math.min(currentQuestion + 1, questions.length-1));

  const changeValues = (value: string) => {
    const newInputValues =
      inputValues.map((v, q) => {   
        if (q === currentQuestion) {
          console.log('EQUAL',q,v, currentQuestion)
          return value
        }
        else {
          console.log('DIFFERENT',q,v, currentQuestion)
          return v
        }
      })
      setValues(newInputValues);
  }
  console.log('qfinal', inputValues)

  return (
    <div className="question-card">
      <h1>Brief-HEXACO-Personality-Inventory</h1>
      <h3 className="question-text">{questions.map(q => q.subject)[currentQuestion]}</h3>
      <LikertScale value={inputValues[currentQuestion]} onChange={changeValues} />
      <Button onClick={prevQuestion}>Prev</Button>
      <Button onClick={nextQuestion}>Next</Button>
      <input type='submit' onClick={handleSubmit}/>
    </div>
  )
}

export default BHITest;