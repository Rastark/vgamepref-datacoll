import { Button, Center, Card, CardBody, Text, Image, Flex, CardFooter, Stack, Box, SimpleGrid, Link, Heading, StackItem } from "@chakra-ui/react";
import { AsyncSelect, GroupBase } from "chakra-react-select";
import React, { useEffect, useMemo, useState } from "react";
import { FormItems, PrefGamesFormItem, QuestionOption, SelectedOption } from "../../types_interfaces/types";
import { JsonProps, GameProps, GemProps, PrefGamesQuestion } from "../../types_interfaces/types";
import useHasMounted from "../../utils/hasMounted";
import { handleFormSubmit } from "../../utils/qre-hooks";
import NavButtons from "../sharable/NavButtons";
import igdb_icon from "../../../public/igdb-icon.png";
import google_play_icon from "../../../public/google-play-icon.png";
import { shuffleArray } from "../../utils/array-utils";
import _ from "lodash";

const GamesQre: React.FC<{
  questionProps: JsonProps<PrefGamesQuestion>
  gameProps: GameProps[],
  gameCatalogProps: GameProps[],
  gemProps: GemProps[],
  showToggle: () => void,
  formData: (
    input: {
      show: boolean,
      formData: PrefGamesFormItem[],
    }) => void
}> = (props) => {

  const questions: PrefGamesQuestion[] = props.questionProps.items;

  // Current question state
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const currentQuestion = questions[currentQuestionId];
  const isLastQuestion = currentQuestionId === questions.length - 1;

  const nTitles = 4;
  const gameTitles = props.gemProps.map(item => item.title);

  // Input state
  const [inputValues, setInputValues] = useState(new Array<SelectedOption>(
    { label: (new Array<QuestionOption>(3).fill({ label: "", value: -1 })), value: -1 },
    { label: (new Array<QuestionOption>(3).fill({ label: "", value: -1 })), value: -1 }));


  // const [firstGameTitles, setFirstGameTitles] = useState([new Array<string>(nTitles).fill(""),
  // new Array<string>(nTitles).fill("")]);


  const fixGameData = (gameList: GameProps[]) => {
    for (let i = 0; i < gameList.length; i++) {
      if (gameList[i].name === "Skyward") {
        gameList[i].url = "https://play.google.com/store/apps/details?id=com.ketchapp.skyward&hl=it&gl=US";
        gameList[i].cover.url = "https://play-lh.googleusercontent.com/SRX7JGu4AeF8WT7igHOdOf9mr4X08-M7lxZtn3AKQg72KsRglBMMJvwI6blz7lWWjvs";
        gameList[i].cover.height = 512;
        gameList[i].cover.width = 384;
      }
      if (!gameList[i].hasOwnProperty("cover")) {
      }
      else {
        gameList[i].cover.url = gameList[i].cover.url.replace("t_thumb", "t_cover_big");
      }
    }
    return gameList;
  }

  const formatData = (gameList: GameProps[]) => {
    shuffleArray(gameList);
    fixGameData(gameList);
    return gameList;
  }

  const getFirstGameTitles = (gameList: GameProps[]) => {
    const firstGameListTitles = new Array<string>(nTitles).fill("");
    for (let i = 0; i < nTitles; i++) {
      firstGameListTitles[i] = gameList[i].name;
    }
    // console.log("first titles:",firstGameListTitles);
    return firstGameListTitles;
  }

  const [gameList, setGameList] = useState(props.gameProps);
  const [gemGameList, setGemGameList] = useState(gameTitles
    .map(title => props.gameCatalogProps.filter(item => item.name == title))
    .map(item => item[0]).filter(item => item));

  // useEffect(() => {
  //   formatData(gameList);
  // }, [])

  useMemo(() => {
    formatData(gameList);
  }, [gameList])

  // useEffect(() => {
  //   saveFirstGameTitles(gameList);
  // }, [gameList])

  useMemo(() => {
    formatData(gemGameList);
  }, [gemGameList]);

  // useEffect(() => {
  //   saveFirstGameTitles(gemGameList);
  // }, [gemGameList]);

  const options = [gemGameList.map((q, i) => ({ label: q.name, value: i })), gameList.map((q, i) => ({ label: q.name, value: i }))];

  // Update parent state on submit
  const handleSubmit = () => {
    props.showToggle();
    const updatedFormData: PrefGamesFormItem[] = inputValues.map((item: any, index: number) => ({
      id: index,
      selectedOption: item,
      firstGameTitles: getFirstGameTitles(index===0 ? gemGameList : gameList)
    }));
    props.formData({ show: false, formData: updatedFormData});
  }

  // Update inputValues dinamically on aswer change
  const changeValues = (newValue: QuestionOption | null, field: number) => {
    if (newValue) {
      let items = [...inputValues];
      let itemToChange = { ...items[currentQuestionId] }
      let optionToChange = { ...itemToChange.label[field] }
      optionToChange.label = newValue.label;
      optionToChange.value = newValue.value;
      itemToChange.label[field] = optionToChange;
      itemToChange.value = currentQuestionId;
      items[currentQuestionId] = itemToChange;
      setInputValues(items);
    }
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
      key={"gem_item" + item.id}
      alignItems="center"
      alignContent="center"
      verticalAlign="center"
      justifyContent="center"
      border={"sm"}
      padding={1}
    >
      <CardBody p={1}>
        <Link href={item.url} isExternal>
          <Image
            src={item.hasOwnProperty("cover")
              ? item.cover.url
              : "https://publications.iarc.fr/uploads/media/default/0001/02/thumb_1240_default_publication.jpeg"}
            objectFit={"cover"}
            align={"center"}
            verticalAlign={"center"}
            borderRadius={"md"}
            minWidth={["10.714589989350372vw", "11.714589989350372vw", "12.714589989350372vw", "13.299254526091588vw"]}
            maxWidth={["12.714589989350372vw", "12.714589989350372vw", "13.714589989350372vw", "14.299254526091588vw"]}
            minHeight={["20.721560130010834vh", "20.721560130010834vh", "20.721560130010834vh", "30.721560130010834vh"]}
            maxHeight={["20.721560130010834vh", "20.721560130010834vh", "20.721560130010834vh", "35.48668796592119vh"]}
          />
        </Link>
        <Stack mt='3' mb='0' spacing='3'>
          <Heading size={"md"}>{item.name}</Heading>
        </Stack>
      </CardBody>
      {/* <CardFooter margin={"-6"}>
        <SimpleGrid columns={[2]}>
          <Link href={item.url} isExternal>
            <Image src={igdb_icon.src}
              borderRadius={"md"}
              margin={"2"}
              objectFit={"scale-down"}
              minWidth={["50px", "50px", "50px", "85px"]}
              maxWidth={["70px", "70px", "70px", "100px"]}
              height={["40px", "40px", "40px", "68px"]}
            />
          </Link>
        </SimpleGrid>
      </CardFooter> */}
    </Card>
  )

  const listGemItems = gemGameList.map(item =>
    <Card
      key={"gem_item" + item.id}
      alignItems="center"
      alignContent="center"
      verticalAlign="center"
      justifyContent="center"
      border={"sm"}
      padding={1}
    >
      <CardBody p={1}>
        <Link href={item.url} isExternal>
          <Image
            src={item.hasOwnProperty("cover")
              ? item.cover.url
              : "https://publications.iarc.fr/uploads/media/default/0001/02/thumb_1240_default_publication.jpeg"}
            objectFit={"cover"}
            align={"center"}
            verticalAlign={"center"}
            borderRadius={"md"}
            minWidth={["10.714589989350372vw", "11.714589989350372vw", "12.714589989350372vw", "13.299254526091588vw"]}
            maxWidth={["12.714589989350372vw", "12.714589989350372vw", "13.714589989350372vw", "14.299254526091588vw"]}
            minHeight={["20.721560130010834vh", "20.721560130010834vh", "20.721560130010834vh", "30.721560130010834vh"]}
            maxHeight={["20.721560130010834vh", "20.721560130010834vh", "20.721560130010834vh", "35.48668796592119vh"]}
          />
        </Link>
        <Stack mt='3' mb='0' spacing='3'>
          <Heading size={"md"}>{item.name}</Heading>
        </Stack>
      </CardBody>
      {/* <CardFooter margin={"-6"}>
        <SimpleGrid columns={[2]}>
          <Link href={item.url} isExternal>
            <Image src={item.name !== "Skyward"
              ? igdb_icon.src
              : google_play_icon.src
            }
              borderRadius={"md"}
              objectFit={"scale-down"}
              margin={"2"}
              minWidth={["50px", "50px", "50px", "85px"]}
              maxWidth={["70px", "70px", "70px", "100px"]}
              height={["40px", "40px", "40px", "68px"]}
            />
          </Link>
        </SimpleGrid>
      </CardFooter> */}
    </Card>
  )

  // Render component
  return (!useHasMounted
    ? <></>
    : <>
      <Box height="100vh" alignItems="center" justifyContent="center" className="questionnaire-box-ext">
        <Box bg="gray.100" p={4} rounded={6} marginX="10%" className="questionnaire-box-int">
          <Heading size={"md"}>Game preferences</Heading>
          <br />
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
          <Flex alignItems="center" justifyContent="center" noOfLines={0}>
            {/* <SimpleGrid columns={2} alignItems="center" justifyContent="center"> */}
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
              isDisabled={!isLastQuestion || (inputValues[currentQuestionId].label[0].value === (-1 || "") ||
              inputValues[currentQuestionId].label[1].value === (-1 || "") ||
              inputValues[currentQuestionId].label[2].value === (-1 || ""))}
              onClick={handleSubmit}>
              Go to Submission Page
            </Button>
            }
            {/* </SimpleGrid> */}
          </Flex>
          <SimpleGrid columns={[1, 2, 3, 4, 4, 4, 5]}>
            {currentQuestionId === 0
              ? listGemItems
              : listItems
            }
          </SimpleGrid>
        </Box>
      </Box>
    </>
  )
}

export default GamesQre;