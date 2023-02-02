import { Box, Button, Flex, Heading, Progress, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { QuestionOption } from "../../types_interfaces/types";
import { JsonProps, FormItem, SelfDetQuestion } from "../../types_interfaces/types";
import useHasMounted from "../../utils/hasMounted";
import { handleFormSubmit, changeItemValuesById } from "../../utils/qre-hooks";
import LikertSlider from "../sharable/LikertSlider";
import NavButtons from "../sharable/NavButtons";


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

  // Update parent state on submit
  const handleSubmit = () => {
    return handleFormSubmit(props, inputValues);
  }

  // Input state
  const [inputValues, setInputValues] = useState(new Array<QuestionOption>(questions.length).fill({ label: "3", value: -1 }));

  // Current question state
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const currentQuestion = questions[currentQuestionId];
  const isFirstQuestion = currentQuestionId === 0;
  const isLastQuestion = currentQuestionId === questions.length - 1;

  // Update inputValues dinamically on aswer change
  const handleChange = (newValue: string) => {
    return changeItemValuesById(
      currentQuestionId,
      { label: newValue, value: +parseInt(newValue) },
      inputValues,
      setInputValues
    )
  }

  // Render component
  return (!useHasMounted ? <></> :
    <div className="question-card">
      <Box height="100vh" alignItems="center" justifyContent="center" className="questionnaire-box-ext">
        <Box p={4} rounded={6} marginX="10%" className="questionnaire-box-int">
        <Text align={"right"}>{Math.round(((+currentQuestion.id + 1) / questions.length) * 100)}%</Text>
        <Progress value={((+currentQuestion.id + 1) / questions.length) * 100} />
          <br />
          <Heading size={"md"}>Basic Personality Needs Satisfaction and Frustration Scale</Heading>
          <br/>
          <Text className="question-text">{currentQuestion.subject}</Text>
          <LikertSlider
            key={currentQuestionId}
            value={+inputValues[currentQuestionId].label}
            onChange={handleChange}
          />
        </Box>
        <Flex alignItems="center" justifyContent="center" noOfLines={0}>
          <NavButtons
            isNextDisabled={inputValues[currentQuestionId].value<1}
            length={questions.length}
            currId={currentQuestionId}
            setCurrId={setCurrentQuestionId}
          />
          {<Button
            // isDisabled={!isLastQuestion || inputValues[currentQuestionId].value<1}
            onClick={handleSubmit}>
            Next Questionnaire
          </Button>
          }
        </Flex>
        <Box p={4} rounded={6} marginX="10%" className="disclaimer-box">
          { isFirstQuestion
          ? <Text><u>Disclaimer:</u> Even if at the beginning the cursor is on 3 (Neutral), you must click on the bar to confirm your answer and continue! ;)</Text>
          :<></>
          }
        </Box>
      </Box>
    </div>
  )
}

export default SelfDetQre;