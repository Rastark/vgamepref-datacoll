import { Box, Button, Flex, Heading, HStack, Progress, TagLabel, Text } from "@chakra-ui/react";
import { GroupBase, OptionBase, Select } from "chakra-react-select";
import e from "cors";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { QuestionOption } from "../../types_interfaces/types";
import { JsonProps, DemographicQuestion, FormItem, SelfDetQuestion } from "../../types_interfaces/types";
import useHasMounted from "../../utils/hasMounted";
import { handleFormSubmit, changeItemValuesById } from "../../utils/qre-hooks";
import LikertRadio from "../sharable/LikertRadio";
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
  console.log("questions", questions)

  // Update parent state on submit
  const handleSubmit = () => {
    return handleFormSubmit(props, inputValues);
  }

  // Input state
  const [inputValues, setInputValues] = useState(new Array<QuestionOption>(questions.length).fill({ label: "3", value: -1 }));
  console.log(inputValues);
  console.log('qinitial', inputValues);

  // Current question state
  const [currentQuestionId, setCurrentQuestionId] = useState(0);

  const currentQuestion = questions[currentQuestionId];
  const isLastQuestion = currentQuestionId === questions.length - 1;

  // Update inputValues dinamically on aswer change
  const changeValues = (newValue: string) => {
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
      <Box height="20vh" alignItems="center" justifyContent="center" className="questionnaire-box-ext">
        <Box p={12} rounded={6} marginX="10%" className="questionnaire-box-int">
        <Text align={"right"}>{Math.round(((+currentQuestion.id + 1) / questions.length) * 100)}%</Text>
        <Progress value={((+currentQuestion.id + 1) / questions.length) * 100} />
        
          <br />
          <Heading size={"md"}>Basic Personality Needs Satisfaction and Frustration Scale</Heading>
          <Text>Below, we ask you about the kind of experiences you actually have in your life. Please read each of
            the following items carefully. You can choose from 1 to 5 to indicate the degree to which the
            statement is true for you at this point in your life. </Text>
          <br />
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
            isNextDisabled={inputValues[currentQuestionId].value<1}
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

export default SelfDetQre;