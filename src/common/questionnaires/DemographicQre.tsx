import { Button, Progress, Flex, Box, Heading, TagLabel, Text, background } from "@chakra-ui/react";
import { GroupBase, OptionBase, Select } from "chakra-react-select";
import React, { useEffect, useState } from "react";
import { QuestionOption } from "../../types_interfaces/types";
import { JsonProps, DemographicQuestion, FormItem } from "../../types_interfaces/types";
import useHasMounted from "../../utils/hasMounted";
import { changeItemValuesById, handleFormSubmit } from "../../utils/qre-hooks";
import NavButtons from "../sharable/NavButtons";


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

  // Update parent state on submit
  const handleSubmit = () => {
    return handleFormSubmit(props, inputValues);
  }

  const [inputValues, setInputValues] = useState(new Array<QuestionOption>(questions.length).fill({ label: "", value: -1 }));
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const currentQuestion = questions[currentQuestionId];
  const options = currentQuestion.options.map((q, i) => ({ label: q, value: i }));
  const isLastQuestion = currentQuestionId === questions.length - 1;

  const handleChange = (newValue: QuestionOption | null) => {
    return changeItemValuesById(
      currentQuestionId,
      newValue,
      inputValues,
      setInputValues
    )
  }
  return (!useHasMounted
    ? <></>
    : <div className="question-card">
      <Box height="100vh" alignItems="center" justifyContent="center" className="questionnaire-box-ext">
        <Box p={4} rounded={6} marginX="10%" className="questionnaire-box-int">
          <Text align={"right"}>{Math.round(((+currentQuestion.id + 1) / questions.length) * 100)}%</Text>
          <Progress value={((+currentQuestion.id + 1) / questions.length) * 100} />
          <br/>
          <Heading size={"md"}>Demographics</Heading>
          <br/>
          <Text className="question-text">{currentQuestion.subject}</Text>
          <Select<QuestionOption, false, GroupBase<QuestionOption>>
            options={options}
            name="optionValue"
            value={inputValues[currentQuestionId].label === ""
              ? null
              : inputValues[currentQuestionId]}
            placeholder="choose an option..."
            onChange={handleChange}
            isRequired={true}
          />
        </Box>
        <Flex alignItems="center" justifyContent="center" noOfLines={0}>
          <NavButtons
            isNextDisabled={inputValues[currentQuestionId].value===-1}
            length={questions.length}
            currId={currentQuestionId}
            setCurrId={setCurrentQuestionId}
          />
          {<Button
            isDisabled={!isLastQuestion || inputValues[currentQuestionId].value===-1}
            onClick={handleSubmit}>
            Next Questionnaire
          </Button>
          }
        </Flex>
      </Box>

    </div>
  )
}

export default DemographicQre;