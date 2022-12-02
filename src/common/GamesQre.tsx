import { Button, Center, Flex, TagLabel } from "@chakra-ui/react";
import { AsyncSelect, GroupBase, OptionBase, Select } from "chakra-react-select";
import React, { useEffect, useState } from "react";
import { QuestionOption, SelectedOption } from "../types_interfaces/interfaces";
import { JsonProps, DemographicQuestion, FormItem, GameProps, QuestionBase, GemProps } from "../types_interfaces/types";
import useHasMounted from "../utils/hasMounted";
import { changeItemValuesById, handleFormSubmit } from "../utils/qre-hooks";
import NavButtons from "./NavButtons";


const GenericQre: React.FC<{
  questionProps: GameProps,
  gemProps: GemProps,
  showToggle: () => void,
  formData: (
    input: {
    show: boolean;
    formData: FormItem[]
  }) => void
}> = (props) => {
  
  const gameList = props.questionProps;
  const gemGameList = props.gemProps
  console.log("game_list", gameList)
  const options = gameList.map((q, i) => ({ label: q.name, value: i}));
  const gemOptions = gemGameList.map((q, i) => ({ label: q.title, value: i}));

  const questions: QuestionBase[] = [
    {
      id: 0,
      subject: "Please list your 3 most favourite games of all time.",
    },
    {
      id: 1,
      subject: "Please list your 3 favourite games from our catalog.",
    }
  ]

  // Update parent state on submit
  const handleSubmit = () => {
    return handleFormSubmit(props, inputValues);
  }

  // Input state
  const [inputValues, setInputValues] = useState(new Array<SelectedOption>(questions.length)
    .fill({label: (new Array<QuestionOption>(3).fill({label: "", value: -1})), value: -1}));
  console.log(inputValues);
  console.log('qinitial', inputValues);

  // Current question state
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const currentQuestion = questions[currentQuestionId];

  const isLastQuestion = currentQuestionId === questions.length-1;

  // Update inputValues dinamically on aswer change
  const changeValues = (newValue: QuestionOption | null, field: number) => {
    console.log("newValue: ", newValue, field)
    if(newValue) {
      // const itemId = newValue.value;x
      console.log("itemId: ", field);
      let items = [...inputValues];
      let itemToChange = {...items[currentQuestionId]}
      let optionToChange = {...itemToChange.label[field]}
      optionToChange.label = newValue.label;  
      optionToChange.value = newValue.value;
      
      itemToChange.label[field] = optionToChange;
      itemToChange.value = currentQuestionId; 
      items[currentQuestionId] = itemToChange;
      setInputValues(items);
      console.log('new_values', items)
    }
    console.log('qfinal', inputValues);
  }

  const loadOptions = (inputValue: string, callback: (arg0: { label: string; value: number; }[]) => void) => {
    setTimeout(() => {
      const values = (currentQuestionId==0 ? options : gemOptions).filter((i: any) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      callback(values);
    }, 3000);
  }

  // Render component
  return (!useHasMounted ? <></> :
    <div className="question-card">
      <h1>Game preferences</h1>
      <h3 className="question-text">{currentQuestion.subject}</h3>
        <Center>First Game</Center>
        <AsyncSelect<QuestionOption, false, GroupBase<QuestionOption>>
          options={options}
          name="optionValue"
          value={ inputValues[currentQuestionId].label[0].label === "" 
            ? null 
            : inputValues[currentQuestionId].label[0] }
          placeholder="choose an option..."
          loadOptions={loadOptions}
          onChange={option => changeValues(option, 0)}
          isRequired={true}
        />
        <Center>Second Game</Center>
        <AsyncSelect<QuestionOption, false, GroupBase<QuestionOption>>
          options={options}
          name="optionValue"
          value={ inputValues[currentQuestionId].label[1].label === "" 
            ? null 
            : inputValues[currentQuestionId].label[1] }
          placeholder="choose an option..."
          loadOptions={loadOptions}
          onChange={option => changeValues(option, 1)}
          isRequired={true}
        />
        <Center>Third Game</Center>
        <AsyncSelect<QuestionOption, false, GroupBase<QuestionOption>>
          options={options}
          name="optionValue"
          value={ inputValues[currentQuestionId].label[2].label === "" 
            ? null 
            : inputValues[currentQuestionId].label[2] }
          placeholder="choose an option..."
          loadOptions={loadOptions}
          onChange={option => changeValues(option, 2)}
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
                Go to results
            </Button> 
          : <></> 
        }
    </div>
  )
}

export default GenericQre;