import { Box, Button, Flex, Heading, List, ListItem, Text, Textarea, UnorderedList } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import BhiQre from "../common/questionnaires/BhiQre";
import DemographicQre from "../common/questionnaires/DemographicQre";
import FinalResults from "../common/FinalResults";
import GamesQre from "../common/questionnaires/GamesQre";
import SelfDetQre from "../common/questionnaires/SelfDetQre";
import { loadBhiProps, loadCatalogGames, loadDemographicProps, loadGames, loadGemProps, loadPrefGamesProps, loadSelfDetProps } from "../lib/load-games";
import { PrefGamesFormItem, QuestionOption } from "../types_interfaces/types";
import { JsonProps, BHIQuestion, DemographicQuestion, FormItem, SurveyAnswers, SelfDetQuestion, GameProps, GemProps, TestScore, PrefGamesQuestion } from "../types_interfaces/types";
import { addNewAnswersDoc, addNewDoc } from "../utils/insertJson";
import { useCalcDimScores } from "../utils/qre-hooks";
import { simpleHash } from "../utils/security-utils";
import QreDescription from "../common/sharable/QreDescription";
import { GoogleReCaptcha, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Script from "next/script";
import { useReCaptcha } from "next-recaptcha-v3";

const Survey: React.FC<{
  bhiProps: JsonProps<BHIQuestion>,
  demographicProps: JsonProps<DemographicQuestion>,
  selfDetProps: JsonProps<SelfDetQuestion>,
  prefGamesProps: JsonProps<PrefGamesQuestion>
  gameProps: GameProps[],
  gameCatalogProps: GameProps[],
  gemProps: GemProps[]
}> = (props) => {

  // const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;

  const { executeRecaptcha } = useReCaptcha();

  const nTitles = 4;

  const [suggestions, setSuggestions] = useState("");

  const [timestamp, setTimestamp] = useState(-1);
  const [isSuggSubmitted, setIsSuggSubmitted] = useState(false);

  const [submittedDocId, setSubmittedDocId] = useState("");
  const [isDocSubmitted, setIsDocSubmitted] = useState(false);

  const [remainingTBoxChars, setRemainingTBoxChars] = useState(500);

  const handleInputChange = (e:any) => {
    let inputValue = e.target.value;
    let inputLength = inputValue.length;
    setRemainingTBoxChars(500 - inputLength);
    setSuggestions(inputValue);
    // console.log(suggestions);
  }

  // Uploads the json doc to cloud firebase
  const handleSubmit = async () => {
    // setSuggestions(suggestions);
    // console.log(suggestions);
    // answers.suggestions = suggestions;
    const ts = Date.now()
    setTimestamp(ts);
    answers.timestamp = ts;
    answers.suggestions = suggestions;
    setSubmittedDocId(await addNewAnswersDoc(answers, "survey_samples"));
    setIsDocSubmitted(true);
    setIsSuggSubmitted(true);
  }

  // const handleSubmit = useCallback(async (e: { preventDefault: () => void; }) => {   
  //   e.preventDefault();

  //   // Generate catpcha token
  //   executeRecaptcha("submitForm").then((gReCaptchaToken) => {
  //     console.log(gReCaptchaToken, "response Google reCaptcha server");
  //     submitForm(gReCaptchaToken);
  //   })
  // }, []);

  // const submitForm = async (gReCaptchaToken: string) => {
  //   const data = { gReCaptchaToken: gReCaptchaToken }
  //   console.log("stringified", JSON.stringify(data));
  //   fetch("/api/submit-form", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     },
  //     body: JSON.stringify(data),
  //   })
  //   .then((res) => res.json())
  //   .then(async (res) => {
  //     console.log(res, "response from backend");
  //     if(res?.status === "success") {
  //       const ts = Date.now()
  //       setTimestamp(ts);
  //       answers.timestamp = ts;
  //       setSubmittedDocId(await addNewAnswersDoc(answers, "hexaco-tests"));
  //       setIsDocSubmitted(true);
  //       console.log(res?.message);
  //     } else {
  //       console.log(res?.message);
  //     }
  //   })
  // }

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
      Please answer considering how much you agree with the following statements on a scale from 1 (Strongly Disagree) to 5 (Strongly Agree).
      Remember: there's no right or wrong option!
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
      The Basic Needs Satisfaction and Frustration Scale (BPNS-FS)
      is a tool that assesses the fulfillment and thwarting of three basic psychological needs: autonomy, competence, and relatedness.
      Each one of them is considered to be fundamental for well-being and optimal functioning.
      <br /><br />
      Please answer considering how much you agree with the following statements on a scale from 1 (Strongly Disagree) to 5 (Strongly Agree).
      Remember: there's no right or wrong option!
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
      Congrats for having reached the last section of the survey! There are just a couple of questions left. ;) <br /> <br />
      You'll be asked for your preferred titles among two subsets of games:
      <UnorderedList>
        <ListItem>
        The first is quite small and contains relatively old games. 
        They were chosen because they represent a wide range of different game elements and mechanics.
        </ListItem>
        <ListItem>
        The second one is bigger (~500 games) and contains the most popular games on IGDB, 
        so we are confident that it will contain a large number of your favorite games!
        </ListItem>
      </UnorderedList>
      Shouldn't you know any of the games on the lists, 
      click on the cover to be redirected to the corresponding IGDB or PlayStore page.
      <br />
    </Text>
  </>
  const [prefGameQuestions, setPrefGameQuestions] = useState({
    show: true,
    formData: new Array<PrefGamesFormItem>(props.gameProps.length).fill({
      id: -1,
      selectedOption: new Array<QuestionOption>(3).fill({ label: "", value: -1 }),
      firstGameTitles: new Array<string>(nTitles).fill("")
    })
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
    suggestions: suggestions,
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

  const updateGames = (input: { show: boolean, formData: PrefGamesFormItem[] }) =>
    setPrefGameQuestions(input);

  const calcBhiScore: TestScore[] = useCalcDimScores(props.bhiProps.items, answers.personality);
  const calcSelfDetScore: TestScore[] = useCalcDimScores(props.selfDetProps.items, answers.self_determination);

  return (<>
    {/* <Script src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}/> */}

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
                        <Heading size={"md"}>You're almost there!</Heading>
                        <br/>
                        <Text>
                          If you wish, you can leave some feedback for us into the text box right below. We'd be happy to hear your opinion. :)<br/>
                          To submit your data and visualize your scores, click on the button!
                          <br />
                        </Text>
                        <br/>
                        <Text>Remaning characters: {remainingTBoxChars}</Text>
                        <Textarea 
                          isDisabled={isSuggSubmitted}
                          value={suggestions} 
                          maxLength={500} 
                          placeholder="Write here something here... (max 500 characters)" 
                          onChange={handleInputChange}
                          />
                        <br/><br/>
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
  </>
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
