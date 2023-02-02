import { Box, Text, Button, OrderedList, ListItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import useHasMounted from "../utils/hasMounted";

const Introduction: React.FC<{}> = () => {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e: any) => {
    router.push("/survey");
    setIsLoading(true);
  }

  const text = <>
    <Text>

      During this experience you will be asked to answer a survey whose goal is to better understand the possible relationships between personality, motivation and gaming preferences.<br />
      Once collected, the data will be analyzed to look for common patterns. They will also be eventually used to train a recommender system that will try to suggest new games to you!<br />
      <br />
      The survey consists of the following questionnaires:
      <OrderedList>
        <ListItem>Demographics</ListItem>
        <ListItem>Brief HEXACO Inventory (BHI)</ListItem>
        <ListItem>Basic Personality Needs Satisfaction and Frustration Scale (BPNS-FS)</ListItem>
        <ListItem>Game preferences</ListItem>
      </OrderedList>

      <br />
      Before you fill out any of these questionnaires, you will receive a brief description to help you understand their purpose.<br />
      Please remember that you must select or click on an answer before you can continue.<br />
      All data collected by this web application is anonymous, so we trust that you'll answer the questions honestly, as you'll not be judged. :D<br />
      You will have the opportunity to look at the results of BHI and BPNS-FS as their results each output a score.
      <br />
      <br />
      We hope you'll have fun!
    </Text>
    <br />
  </>

  return (!useHasMounted() ? <></> : <>
    <Box height={"max-content"} alignItems="center" justifyContent="center" className="questionnaire-box-ext">
      <Box p={12} rounded={6} marginX="10px" padding={"var(--chakra-space-4)"} className="questionnaire-box-int">
        {text}
        <Button
          onClick={handleClick}
          isLoading={isLoading}>
          Take me to the survey!
        </Button>
      </Box>
    </Box>
  </>)
}

export default Introduction;