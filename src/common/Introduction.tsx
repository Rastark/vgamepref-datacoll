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
      During this experience, you will be aswering a survey which scope is to better understand the correlation between personality, motivation, and game preferences.<br />
      After the collection, the data will be analyzed to search for common patterns; it will also be eventually used to train a recommender system, which will try to suggest new games for you!<br />
      <br />
      The survey is composed by the following questionnaires:
      <OrderedList>
        <ListItem>Demographics</ListItem>
        <ListItem>Brief HEXACO Inventory (BHI)</ListItem>
        <ListItem>Basic Personality Needs Satisfaction and Frustration Scale (BPNS-FS)</ListItem>
        <ListItem>Game preferences</ListItem>
      </OrderedList>

      <br />
      Before undertaking each one of this questionnaires, you will be presented with a short description of it, to help you understand its purpose.<br />
      Please keep in mind that, with no exceptions to the rule, you actually need to select or click on a response before you can proceed.<br />
      All data gathered by this web application is anonymous, so we trust that you'll respond honestly to the questions, since you won't be judged. :D<br />
      You will have the opportunity to look at  results of both BHI and BPNS-FS, since their output produces a score.
      <br />
      <br />
      We hope you'll have fun!
    </Text>
    <br/>
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