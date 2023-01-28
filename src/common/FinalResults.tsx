import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import { BHIQuestion, SurveyAnswers, SurveyQuestions, SelfDetQuestion, TestScore } from "../types_interfaces/types";
import useHasMounted from "../utils/hasMounted";
// import "../styles.css";
// import BoxPlot from "./BoxPlot";
import { useCalcDimScores } from "../utils/qre-hooks";

const FinalResults: React.FC<{
  questions: SurveyQuestions,
  answers: SurveyAnswers,
  bhiScores: TestScore[]
  selfDetScores: TestScore[]
}> = (props) => {
  const questions = props.questions;
  const answers = props.answers;
  const bhiScores = props.bhiScores;
  const selfDetScores = props.selfDetScores;

  console.log("props", props);
  console.log("final_scores: ", bhiScores, selfDetScores);

  const printBhiScores =
    bhiScores.map(item =>
      <Text key={item.dimension}>
        <u>{item.dimension}:</u> {item.score}
      </Text>
    )

  const printSelfDetScores =
    selfDetScores.map(item =>
      <Text key={item.dimension}>
        <u>{item.dimension}:</u> {item.score}
      </Text>
    )

  const demographicQuestions =
    questions.demographics.map(item => item.subject)
  const personalityQuestions =
    questions.personality.map(item => item.subject)
  const selfDetQuestions =
    questions.self_determination.map(item => item.subject)
  const prefGamesQuestions =
    questions.preferred_games.map(item => item.subject)

  const printDemographicAnswers =
    answers.demographics.map(item => <Text key={"demographics"+item.id}>
      {demographicQuestions[item.id]} {"->"} {item.selectedOption.label}
    </Text>)

  const printPersonalityAnswers =
    answers.personality.map(item => <Text key={"personality"+item.id}>
      {personalityQuestions[item.id]} {"->"} {item.selectedOption.label}
    </Text>)

  const printSelfDetAnswers =
    answers.self_determination.map(item => <Text key={"self-det"+item.id}>
      {selfDetQuestions[item.id]} {"->"} {item.selectedOption.label}
    </Text>)

  const printPrefGamesAnswers =
    answers.preferred_games.map(item => <Text key={"pref-games"+item.id}>
      {prefGamesQuestions[item.id]} {"->"} {item.selectedOption.map(item => item.label)}
    </Text>)

  return (!useHasMounted
    ? <></>
    : <div className="final-results">
      <Box height={"max-content"} alignItems="center" justifyContent="center" className="questionnaire-box-ext">
        <Box p={12} rounded={6} marginX="10px" padding={"var(--chakra-space-4)"} className="questionnaire-box-int">
          <>
            <Heading>Thank you for taking the surveys! </Heading>
            <Text>Here's your recap if you are interested. Please check if your data is correct before submitting the survey!</Text>
            {/* <Divider color={"black"} size={"lg"}/> */}
            <br />
            {/* {answers.demographics} */}
            <Heading size={"md"}>Your Brief-HEXACO Inventory scores</Heading>
            {printBhiScores}
            <br />
            <Heading size={"md"}>Your Basic Personality Needs Satisfaction and Frustration Scale scores</Heading>
            {printSelfDetScores}
            {/* <br />
            <br />
            <Heading size={"md"}>Your Survey Answers</Heading>
            <Heading size={"sm"}>Demographic</Heading>
            {printDemographicAnswers}
            <Heading size={"sm"}>Personality</Heading>
            {printPersonalityAnswers}
            <Heading size={"sm"}>Self Determination</Heading>
            {printSelfDetAnswers}
            <Heading size={"sm"}>Preferred Games</Heading>
            {printPrefGamesAnswers} */}

          </>
        </Box>
      </Box>
    </div>
  )
}

export default FinalResults;