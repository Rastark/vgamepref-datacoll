import { Box, Button, Flex, Heading, List, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React, { useState } from "react";
import BhiQre from "../common/questionnaires/BhiQre";
import DemographicQre from "../common/questionnaires/DemographicQre";
import FinalResults from "../common/FinalResults";
import GamesQre from "../common/questionnaires/GamesQre";
import SelfDetQre from "../common/questionnaires/SelfDetQre";
import { loadBhiProps, loadCatalogGames, loadDemographicProps, loadGames, loadGemProps, loadPrefGamesProps, loadSelfDetProps } from "../lib/load-games";
import { FormItems, QuestionOption } from "../types_interfaces/types";
import { JsonProps, BHIQuestion, DemographicQuestion, FormItem, SurveyAnswers, SelfDetQuestion, GameProps, GemProps, TestScore, PrefGamesQuestion } from "../types_interfaces/types";
import { addNewAnswersDoc, addNewDoc } from "../utils/insertJson";
import { useCalcDimScores } from "../utils/qre-hooks";
import { simpleHash } from "../utils/security-utils";
import QreDescription from "../common/sharable/QreDescription";

const Survey: React.FC<{
  bhiProps: JsonProps<BHIQuestion>,
  demographicProps: JsonProps<DemographicQuestion>,
  selfDetProps: JsonProps<SelfDetQuestion>,
  prefGamesProps: JsonProps<PrefGamesQuestion>
  gameProps: GameProps[],
  gameCatalogProps: GameProps[],
  gemProps: GemProps[]
}> = (props) => {

  const [timestamp, setTimestamp] = useState(-1);

  const [submittedDocId, setSubmittedDocId] = useState("")
  const [isDocSubmitted, setIsDocSubmitted] = useState(false)

  // Uploads the json doc to cloud firebase
  const handleSubmit = async () => {
    const ts = Date.now()
    setTimestamp(ts);
    answers.timestamp = ts;
    setSubmittedDocId(await addNewAnswersDoc(answers, "hexaco-tests"));
    setIsDocSubmitted(true);
  };

  // Demographic vars
  const [demographicQuestions, setDemographicQuestions] = useState({
    show: true,
    formData: Array<FormItem>(props.demographicProps.items.length).fill({ id: -1, selectedOption: { label: "", value: -1 } })
  });

  // BHI vars
  const [showBhi, setShowBhi] = useState(true);
  const bhiDescription = <>
    <Text>
      <Heading size="md">2. Brief-HEXACO Personality Inventory</Heading>
      <br />
      The Brief HEXACO Inventory (BHI)
      is a shortened version of the HEXACO Personality Inventory (HPI)
      which is a measure of the six personality traits of the HEXACO model: Honesty-Humility,
      Emotionality, Extraversion, Agreeableness, Conscientiousness and Openness to experience.
      The BHI is designed to be a shorter and more efficient version of the HPI, while still maintaining good reliability and validity.
      <br /><br />
      Please answer considering how much you agree with the following statements in a scale from 1 (Strongly Disagree) to 5 (Strongly Agree).
      <br />
    </Text>
  </>
  const [bhiQuestions, setBhiQuestions] = useState({
    show: true,
    formData: new Array<FormItem>(props.bhiProps.items.length).fill({ id: -1, selectedOption: { label: "", value: -1 } })
  });

  // BPNS vars
  const [showSelfDet, setShowSelfDet] = useState(true);
  const selfDetDescription = <>
    <Text>
      <Heading size="md">3. Basic Needs Satisfaction and Frustration Scale</Heading>
      <br />
      The Basic Needs Satisfaction and Frustration Scale (BNFS)
      is a tool that is used to assess the degree to which people's
      basic psychological needs are being met or thwarted.
      three basic psychological needs that the BNFS measures are autonomy, competence, and relatedness.
      <br /><br />
      Please answer considering how much you agree with the following statements in a scale from 1 (Strongly Disagree) to 5 (Strongly Agree).
      <br />
    </Text>
  </>
  const [selfDetQuestions, setSelfDetQuestions] = useState({
    show: true,
    formData: new Array<FormItem>(props.selfDetProps.items.length).fill({ id: -1, selectedOption: { label: "", value: -1 } })
  });

  // Preferred Games vars
  const [showPrefGame, setShowPrefGame] = useState(true);
  const prefGameDescription = <>
    <Text>
      <Heading size="md">4. Game Preferences</Heading>
      <br />
      Congrats for having reached the last section of the survey! There are just a couple of question left. ;) <br /> <br />
      You'll be asked about your game preferences regarding two subsets of games:
      <UnorderedList>
        <ListItem>
          The first one is pretty small and contains relatively old games;
          for this reason, shouldn't you know any of the games on the list,
          there will be links below to check on each game information on IGDB.
        </ListItem>
        <ListItem>
          The second one is larger (~500 games) and contains the most popular games
          on IGDB, so we are confident that it contains a good number of your favorite ones!
        </ListItem>
      </UnorderedList>
      <br />
    </Text>
  </>
  const [prefGameQuestions, setPrefGameQuestions] = useState({
    show: true,
    formData: new Array<FormItems>(props.gameProps.length).fill({ id: -1, selectedOption: new Array<QuestionOption>(3).fill({ label: "", value: -1 }) })
  });

  // Page state triggers
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
    setPrefGameQuestions(value => ({
      show: !(value.show),
      formData: value.formData
    }));

  // Survey data structures init
  const answers: SurveyAnswers = {
    demographics: demographicQuestions.formData,
    personality: bhiQuestions.formData,
    self_determination: selfDetQuestions.formData,
    preferred_games: prefGameQuestions.formData,
    timestamp: timestamp
  };

  const questions = {
    demographics: props.demographicProps.items,
    personality: props.bhiProps.items,
    self_determination: props.selfDetProps.items,
    preferred_games: props.prefGamesProps.items
  }

  // Update methods
  const updateDemographics = (input: { show: boolean, formData: FormItem[] }) =>
    setDemographicQuestions(input);

  const updateBhi = (input: { show: boolean, formData: FormItem[] }) =>
    setBhiQuestions(input);

  const updateSelfDet = (input: { show: boolean, formData: FormItem[] }) =>
    setSelfDetQuestions(input);

  const updateGames = (input: { show: boolean, formData: FormItems[] }) =>
    setPrefGameQuestions(input);

  const calcBhiScore: TestScore[] = useCalcDimScores(props.bhiProps.items, answers.personality);
  const calcSelfDetScore: TestScore[] = useCalcDimScores(props.selfDetProps.items, answers.self_determination);

  return (
    <Box height="auto" alignItems="center" justifyContent="center" className="page-box-ext">
      <Box height="auto" background="gray.100" p={12} rounded={6} className="page-box-int">
        {demographicQuestions.show
          ? <DemographicQre
            questionProps={props.demographicProps}
            showToggle={toggleDemographicShow}
            formData={updateDemographics}
          />
          : showBhi
            ? <QreDescription
              description={bhiDescription}
              setShow={setShowBhi}
            />
            : bhiQuestions.show
              ? <BhiQre
                questionProps={props.bhiProps}
                showToggle={toggleBhiShow}
                formData={updateBhi}
              />
              : showSelfDet
                ? <QreDescription
                  description={selfDetDescription}
                  setShow={setShowSelfDet}
                />
                : selfDetQuestions.show
                  ? <SelfDetQre
                    questionProps={props.selfDetProps}
                    showToggle={toggleSelfDetShow}
                    formData={updateSelfDet}
                  />
                  : showPrefGame
                    ? <QreDescription
                      description={prefGameDescription}
                      setShow={setShowPrefGame}
                    />
                    : prefGameQuestions.show
                      ? <GamesQre
                        questionProps={props.prefGamesProps}
                        gameProps={props.gameProps}
                        gameCatalogProps={props.gameCatalogProps}
                        gemProps={props.gemProps}
                        showToggle={toggleGameShow}
                        formData={updateGames}
                      />
                      : <>
                        <Text>
                          We've reached the end! To submit your result and visualize your scores, click on the button below!
                          <br />
                        </Text>
                        <Button
                          alignItems={"center"}
                          isDisabled={isDocSubmitted}
                          onClick={handleSubmit}
                        >
                          Submit my Answers!
                        </Button>
                      </>
        }
        {isDocSubmitted
          ? <>
            <Text bg="green.200">
              Your results have been saved with the code: {simpleHash(submittedDocId)}.
            </Text>
            <FinalResults
              questions={questions}
              answers={answers}
              bhiScores={calcBhiScore}
              selfDetScores={calcSelfDetScore}
            /></>
          : <></>
        }
      </Box>
    </Box>
  )
}

// Switch to SSR if fetched data is stale
// export async function getServerSideProps() {
export async function getStaticProps() {
  const bhiProps: JsonProps<BHIQuestion> = await loadBhiProps();

  const demographicProps: JsonProps<DemographicQuestion> = await loadDemographicProps();

  const selfDetProps: JsonProps<SelfDetQuestion> = await loadSelfDetProps();

  const prefGamesProps: JsonProps<PrefGamesQuestion> = await loadPrefGamesProps();

  const gameProps: GameProps[] = await loadGames();

  const gemProps: GemProps[] = await loadGemProps();

  const gameCatalogProps: GameProps[] = await loadCatalogGames();

  return {
    props: { bhiProps, demographicProps, selfDetProps, prefGamesProps, gameProps, gameCatalogProps, gemProps },
  }
}

export default Survey;
