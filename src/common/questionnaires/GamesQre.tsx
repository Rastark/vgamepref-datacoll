import { Button, Center, Card, CardBody, Text, Image, Flex, TagLabel, Grid, GridItem, Divider, CardHeader, CardFooter, Stack, Box, HStack, SimpleGrid, Link, VStack, Heading, StackDivider, StackItem } from "@chakra-ui/react";
import { AsyncSelect, GroupBase, OptionBase, Select } from "chakra-react-select";
import React, { SetStateAction, useEffect, useMemo, useState } from "react";
import { QuestionOption, SelectedOption } from "../../types_interfaces/types";
import { JsonProps, DemographicQuestion, FormItem, GameProps, QuestionBase, GemProps, PrefGamesQuestion } from "../../types_interfaces/types";
import useHasMounted from "../../utils/hasMounted";
import { useChangeItemValuesById, handleFormSubmit } from "../../utils/qre-hooks";
import NavButtons from "../sharable/NavButtons";
import igdb_icon from "../../../public/igdb-icon.png";
import { FiAlignCenter, FiAlignJustify } from "react-icons/fi";
import { shuffleArray } from "../../utils/array-utils";
import { timeStamp } from "console";

const GamesQre: React.FC<{
  questionProps: JsonProps<PrefGamesQuestion>
  gameProps: GameProps[],
  gameCatalogProps: GameProps[],
  gemProps: GemProps,
  showToggle: () => void,
  formData: (
    input: {
      show: boolean;
      formData: FormItem[]
    }) => void
}> = (props) => {

  // const gameList = props.gameProps;
  // const gameCatalogList = props.gameCatalogProps;
  // const gemGameProps = props.gemProps;

  // const gameTitles = gemGameProps.map(item => item.title);
  // let gemGameList: GameProps = [];

  const gameTitles = props.gemProps.map(item => item.title);

  const fixGameData = (gameList: GameProps[]) => {
    console.log("gameList", gameList);
    for (let i = 0; i < gameList.length; i++) {
      if (!gameList[i].hasOwnProperty("cover")) {
      }
      else {
        gameList[i].cover.url = gameList[i].cover.url.replace("t_thumb", "t_cover_big");
        console.log("replaced", gameList.map(item => item.name), gameList[i].cover.url)
      }
    }
    return gameList;
  }

  const formatData = (gameList: GameProps[]) => {
    shuffleArray(gameList);
    fixGameData(gameList);
    return gameList;
  }

  const [gameList, setGameList] = useState(props.gameProps);
  const [gemGameList, setGemGameList] = useState(gameTitles
    .map(title => props.gameCatalogProps.filter(item => item.name == title))
    .map(item => item[0]).filter(item => item));

  useEffect(() => {
    formatData(gameList);
  }, [])

  useMemo(() => formatData(gemGameList), [gemGameList]);

  console.log("game_list", gameList)
  const options = [gemGameList.map((q, i) => ({ label: q.name, value: i })), gameList.map((q, i) => ({ label: q.name, value: i }))];

  const questions: PrefGamesQuestion[] = props.questionProps.items;

  // Update parent state on submit
  const handleSubmit = () => {
    return handleFormSubmit(props, inputValues);
  }

  // Input state
  const [inputValues, setInputValues] = useState(new Array<SelectedOption>(
    { label: (new Array<QuestionOption>(3).fill({ label: "", value: -1 })), value: -1 },
    { label: (new Array<QuestionOption>(3).fill({ label: "", value: -1 })), value: -1 }));
  console.log(inputValues, typeof (inputValues));
  console.log('qinitial', inputValues);

  // Current question state
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const currentQuestion = questions[currentQuestionId];

  const isLastQuestion = currentQuestionId === questions.length - 1;

  // Update inputValues dinamically on aswer change
  const changeValues = (newValue: QuestionOption | null, field: number) => {
    console.log("newValue: ", newValue, field)
    console.log("inputValuesBefore", inputValues)
    if (newValue) {
      // const itemId = newValue.value;x
      console.log("itemId: ", field);
      let items = [...inputValues];
      console.log("items", items)
      let itemToChange = { ...items[currentQuestionId] }
      console.log("itemToChange", itemToChange)
      let optionToChange = { ...itemToChange.label[field] }
      console.log("optionToChange", optionToChange)
      console.log("label", optionToChange.label)
      optionToChange.label = newValue.label;
      console.log("value", optionToChange.value)
      optionToChange.value = newValue.value;

      itemToChange.label[field] = optionToChange;
      itemToChange.value = currentQuestionId;
      items[currentQuestionId] = itemToChange;
      console.log(items[currentQuestionId + 1])
      setInputValues(items);
      console.log('new_values', items)
    }
    console.log('qfinal', inputValues);
  }

  const loadOptions = (inputValue: string, callback: (arg0: { label: string; value: number; }[]) => void) => {
    setTimeout(() => {
      const values = options[currentQuestionId].filter((i: any) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      callback(values);
    }, 1000);
  }

  const listItems = gameList.map(item =>
    <Card
      alignItems="center"
      alignContent="center"
      verticalAlign="center"
      justifyContent="center"
      border={"sm"}
      padding={"var(--chakra-space-2)"}
    >
      <CardBody>
        <Image
          src={item.hasOwnProperty("cover")
            ? item.cover.url
            : "https://publications.iarc.fr/uploads/media/default/0001/02/thumb_1240_default_publication.jpeg"}
          objectFit={"contain"}
          align={"center"}
          verticalAlign={"center"}
          borderRadius={"md"}
          minWidth={["110px", "110px", "110px", "200px"]}
          minHeight={["161px", "161px", "161px", "255px"]}
        />
        <Stack mt='3' mb='0' spacing='3'>
          <Heading size={"md"}>{item.name}</Heading>
        </Stack>
      </CardBody>
      <CardFooter margin={"-6"}>
        <SimpleGrid columns={[2]}>
          <Link href={item.url} isExternal>
            <Image src={igdb_icon.src}
              borderRadius={"md"}
              margin={"2"}
            />
          </Link>
        </SimpleGrid>
      </CardFooter>
      {/* <Divider /> */}
    </Card>
  )

  const listGemItems = gemGameList.map(item =>
    <Card
      alignItems="center"
      alignContent="center"
      verticalAlign="center"
      justifyContent="center"
      border={"sm"}
      padding={"var(--chakra-space-2)"}
    >
      <CardBody>
        <Image
          src={item.hasOwnProperty("cover")
            ? item.cover.url
            : "https://publications.iarc.fr/uploads/media/default/0001/02/thumb_1240_default_publication.jpeg"}
          objectFit={"contain"}
          align={"center"}
          verticalAlign={"center"}
          borderRadius={"md"}
          minWidth={["110px", "110px", "110px", "200px"]}
          minHeight={["161px", "161px", "161px", "255px"]}
        />
        <Stack mt='3' mb='0' spacing='3'>
          <Heading size={"md"}>{item.name}</Heading>
        </Stack>
      </CardBody>
      <CardFooter margin={"-6"}>
        <SimpleGrid columns={[2]}>
          <Link href={item.url} isExternal>
            <Image src={igdb_icon.src}
              borderRadius={"md"}
              margin={"2"}
            />
          </Link>
        </SimpleGrid>
      </CardFooter>
      {/* <Divider /> */}
    </Card>
  )

  // Render component
  return (!useHasMounted
    ? <></>
    : <div className="question-card">
      <Heading size={"md"}>Game preferences</Heading>
      <br/>
      <Text className="question-text">{currentQuestion.subject}</Text>
      <SimpleGrid columns={3}>
        <Box>
          <Center>First</Center>
          <AsyncSelect<QuestionOption, false, GroupBase<QuestionOption>>
            key={currentQuestionId && inputValues[currentQuestionId].label[0].label !== "" ? currentQuestionId + "0" : null}
            options={options[currentQuestionId]}
            name="optionValue"
            value={inputValues[currentQuestionId].label[0].label === ""
              ? null
              : inputValues[currentQuestionId].label[0]}
            placeholder="choose an option..."
            loadOptions={loadOptions}
            onChange={option => changeValues(option, 0)}
            isRequired={true}
          />
        </Box>
        <Box>
          <Center>Second</Center>
          <AsyncSelect<QuestionOption, false, GroupBase<QuestionOption>>
            // isClearable
            // backspaceRemovesValue
            // escapeClearsValue  
            // cacheOptions
            key={currentQuestionId && inputValues[currentQuestionId].label[0].label !== "" ? currentQuestionId + "0" : null}
            // inputValue={inputValues[currentQuestionId].label[1].label}
            options={options[currentQuestionId]}
            name="optionValue"
            // inputValue={inputValues[currentQuestionId].label[1].label}
            value={inputValues[currentQuestionId].label[1].label === ""
              ? null
              : inputValues[currentQuestionId].label[1]}
            placeholder="choose an option..."
            loadOptions={loadOptions}
            onChange={option => changeValues(option, 1)}
            isRequired={true}
          />
        </Box>
        <Box>
          <Center>Third</Center>
          <AsyncSelect<QuestionOption, false, GroupBase<QuestionOption>>
            key={currentQuestionId && inputValues[currentQuestionId].label[0].label !== "" ? currentQuestionId + "0" : null}
            options={options[currentQuestionId]}
            name="optionValue"
            value={inputValues[currentQuestionId].label[2].label === ""
              ? null
              : inputValues[currentQuestionId].label[2]}
            placeholder="choose an option..."
            loadOptions={loadOptions}
            onChange={option => changeValues(option, 2)}
            isRequired={true}
          />
        </Box>
      </SimpleGrid>
      <Flex alignItems="center" justifyContent="center">
        <SimpleGrid columns={2} alignItems="center" justifyContent="center">
          <NavButtons
            isNextDisabled={
              inputValues[currentQuestionId].label[0].value === (-1 || "") ||
              inputValues[currentQuestionId].label[1].value === (-1 || "") ||
              inputValues[currentQuestionId].label[2].value === (-1 || "")}
            length={questions.length}
            currId={currentQuestionId}
            setCurrId={setCurrentQuestionId}
          />
          {<Button
            // isDisabled={!isLastQuestion}
            onClick={handleSubmit}>
            Results
          </Button>
          }
        </SimpleGrid>
      </Flex>
      <SimpleGrid columns={[2, 3, 4, 5]}>
        {currentQuestionId === 0
          ? listGemItems
          : listItems
        }
      </SimpleGrid>
    </div>
  )
}

export default GamesQre;