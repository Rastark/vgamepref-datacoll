import { Box, Button, Flex, Heading, Progress, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import LikertRadio from "../sharable/LikertRadio";
import { JsonProps, BHIQuestion, FormItem } from "../../types_interfaces/types";
import useHasMounted from "../../utils/hasMounted";
import { v4 as uuidv4 } from "uuid";
import NavButtons from "../sharable/NavButtons";
import { changeItemValuesById, handleFormSubmit } from "../../utils/qre-hooks";
import { QuestionOption } from "../../types_interfaces/types";
import LikertSlider from "../sharable/LikertSlider";

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
    return handleFormSubmit(props, inputValues);
  }

  const [inputValues, setInputValues] = useState(new Array<QuestionOption>(questions.length).fill({ label: "3", value: -1 }));
  console.log('qinitial', inputValues);

  const [currentQuestionId, setCurrentQuestionId] = useState(0);

  const currentQuestion = questions[currentQuestionId];
  const isLastQuestion = currentQuestionId === questions.length - 1;

  const changeValues = (newValue: number) => {
    return changeItemValuesById(
      currentQuestionId,
      { label: newValue.toString(), value: newValue },
      inputValues,
      setInputValues
    )
  }

  return (!useHasMounted
    ? <></>
    : <div className="question-card">
      <Box height="20vh" alignItems="center" justifyContent="center" className="questionnaire-box-ext">
        <Box p={12} rounded={6} marginX="10%" className="questionnaire-box-int">
          <Text align={"right"}>{Math.round(((+currentQuestion.id + 1) / questions.length) * 100)}%</Text>
          <Progress value={((+currentQuestion.id + 1) / questions.length) * 100} />
          <br/>
          <Heading size={"md"}>Brief-HEXACO-Personality-Inventory</Heading>
          <br/>
          <h3 className="question-text">{currentQuestion.subject}</h3>
          {/* <LikertScale value={inputValues[currentQuestionId].label}
            onChange={changeValues}
          /> */}
          <LikertSlider
            key={currentQuestionId}
            value={+inputValues[currentQuestionId].label}
            onChange={changeValues}
          />
        </Box>
        <Flex alignItems="center" justifyContent="center">
          <NavButtons
            isNextDisabled={inputValues[currentQuestionId].value < 1}
            length={questions.length}
            currId={currentQuestionId}
            setCurrId={setCurrentQuestionId}
          />
          {<Button
            // isDisabled={!isLastQuestion}
            onClick={handleSubmit}>
            Next survey
          </Button>
          }
        </Flex>
      </Box>
    </div>
  )

}

export default BhiQre;