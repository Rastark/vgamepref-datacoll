import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import BhiQre from "../common/questionnaires/BhiQre";
import DemographicQre from "../common/questionnaires/DemographicQre";
import FinalResults from "../common/FinalResults";
import GamesQre from "../common/questionnaires/GamesQre";
import SelfDetQre from "../common/questionnaires/SelfDetQre";
import { loadCatalogGames, loadGames } from "../lib/load-games";
import { QuestionOption } from "../types_interfaces/types";
import { JsonProps, BHIQuestion, DemographicQuestion, FormItem, SurveyAnswers, SelfDetQuestion, GameProps, GemProps, TestScore, PrefGamesQuestion } from "../types_interfaces/types";
import { addNewDoc } from "../utils/insertJson";
import { useCalcDimScores } from "../utils/qre-hooks";

const bhi_test: React.FC<{
  bhiProps: JsonProps<BHIQuestion>,
  demographicProps: JsonProps<DemographicQuestion>,
  selfDetProps: JsonProps<SelfDetQuestion>,
  prefGamesProps: JsonProps<PrefGamesQuestion>
  gameProps: GameProps,
  gameCatalogProps: GameProps,
  gemProps: GemProps
}> = (props) => {

  console.log("demographic_test", props.demographicProps);

  // Uploads the json doc to cloud firebase
  const handleSubmit = () => {
    console.log("questionnaire answers: ", answers);
    addNewDoc(answers, "hexaco-tests");
  };

  // Test button. Doesn't upload on DB.
  const handleFakeSubmit = () => {
    console.log("questionnaire answers: ", answers);
  }


  // state declarations
  const [demographicQuestions, setDemographicQuestions] = useState({
    show: true,
    formData: Array<FormItem>(props.demographicProps.items.length).fill({ id: -1, selectedOption: { label: "", value: -1 } })
  });

  const [bhiQuestions, setBhiQuestions] = useState({
    show: true,
    formData: new Array<FormItem>(props.bhiProps.items.length).fill({ id: -1, selectedOption: { label: "", value: -1 } })
  });

  const [selfDetQuestions, setSelfDetQuestions] = useState({
    show: true,
    formData: new Array<FormItem>(props.selfDetProps.items.length).fill({ id: -1, selectedOption: { label: "", value: -1 } })
  });

  const [gameQuestions, setGameQuestions] = useState({
    show: true,
    formData: new Array<FormItem>(props.gameProps.length).fill({ id: -1, selectedOption: new Array<QuestionOption>(3).fill({ label: "", value: -1 }) })
  });

  console.log("bhi_test", props.bhiProps);
  console.log(demographicQuestions)

  // state triggers
  const toggleDemographicShow = () => {
    // console.log("HEY", !showDemographicQuestions.show)
    setDemographicQuestions(value => ({
      show: !(value.show),
      formData: value.formData
    }))
    // console.log(showDemographicQuestions.show)
  };

  const toggleBhiShow = () =>
    setBhiQuestions(value => ({
      show: !(value.show),
      formData: value.formData
    }));

  const toggleSelfDetShow = () =>
    setSelfDetQuestions(value => ({
      show: !(value.show),
      formData: value.formData
    }));

  const toggleGameShow = () =>
    setGameQuestions(value => ({
      show: !(value.show),
      formData: value.formData
    }));

  const answers: SurveyAnswers = {
    demographics: demographicQuestions.formData,
    personality: bhiQuestions.formData,
    self_determination: selfDetQuestions.formData,
    preferred_games: gameQuestions.formData
  };

  const questions = {
    demographics: props.demographicProps.items,
    personality: props.bhiProps.items,
    self_determination: props.selfDetProps.items,
    preferred_games: props.prefGamesProps.items
  }

  const updateDemographics = (input: { show: boolean, formData: FormItem[] }) =>
    setDemographicQuestions(input);

  const updateBhi = (input: { show: boolean, formData: FormItem[] }) =>
    setBhiQuestions(input);

  const updateSelfDet = (input: { show: boolean, formData: FormItem[] }) =>
    setSelfDetQuestions(input);

  const updateGames = (input: { show: boolean, formData: FormItem[] }) =>
    setGameQuestions(input);

  const calcBhiScore: TestScore[] = useCalcDimScores(props.bhiProps.items, answers.personality);
  const calcSelfDetScore: TestScore[] = useCalcDimScores(props.selfDetProps.items, answers.self_determination);

  console.log("answers: ", answers);

  return (
    <Box height="100vh" alignItems="center" justifyContent="center" className="page-box-ext">
      <Box background="gray.100" p={12} rounded={6} className="page-box-int">
        {demographicQuestions.show
          ? <div className="demographic-questions">
            <DemographicQre
              questionProps={props.demographicProps}
              showToggle={toggleDemographicShow}
              formData={updateDemographics}
            />
          </div>
          : bhiQuestions.show
            ? <BhiQre
              questionProps={props.bhiProps}
              showToggle={toggleBhiShow}
              formData={updateBhi}
            />
            : selfDetQuestions.show
              ? <SelfDetQre
                questionProps={props.selfDetProps}
                showToggle={toggleSelfDetShow}
                formData={updateSelfDet}
              />
              : gameQuestions.show
                ? <GamesQre
                  questionProps={props.gameCatalogProps}
                  gemProps={props.gemProps}
                  showToggle={toggleGameShow}
                  formData={updateGames}
                />

                : <div>
                  <FinalResults
                    questions={questions}
                    answers={answers}
                    bhiScores={calcBhiScore}
                    selfDetScores={calcSelfDetScore}
                  />
                  <Button
                    onClick={handleSubmit}>
                    Submit Questionnaire
                  </Button>
                </div>
        }
        {/* <div><Box><Box><Button onClick={handleFakeSubmit}>Fake Submit</Button></Box></Box></div> */}
      </Box>
    </Box>
  )
}

export async function getServerSideProps() {

  const bhiProps =
    await fetch("http://localhost:3000/api/bhi")
      .then(async response => await response.json())
  // .then(json => console.log(json)); 

  const demographicProps =
    await fetch("http://localhost:3000/api/demographics")
      .then(async response => await response.json());

  const selfDetProps =
    await fetch("http://localhost:3000/api/bpnsfs")
      .then(async response => await response.json());

  const prefGamesProps =
    await fetch("http://localhost:3000/api/prefgames")
      .then(async response => await response.json());

  const gameProps: GameProps = await loadGames();

  console.log("gameProps", gameProps)

  const gemProps: GemProps =
    await fetch("http://localhost:3000/api/gem")
      .then(async response => await response.json());

  const titles = gemProps.map(item => item.title)
  const gameCatalogProps: GameProps = await loadCatalogGames(titles);

  console.log("gameCatalogProps", gameCatalogProps);

  return {
    props: { bhiProps, demographicProps, selfDetProps, prefGamesProps, gameProps, gameCatalogProps, gemProps },
  }
}

export default bhi_test;
