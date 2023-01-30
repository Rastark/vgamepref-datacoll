import { Box, Button, Flex, Heading, Progress, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import useHasMounted from "../../utils/hasMounted";
import NavButtons from "./NavButtons";

const QreDescription: React.FC<{
  description: JSX.Element,
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}> = (props) => {

  const handleClick = () => props.setShow(false);

  return (!useHasMounted
    ? <></>
    : <div className="questionnaire-description">
      <Box height="20vh" alignItems="center" justifyContent="center" className="questionnaire-box-ext">
        <Box p={4} rounded={6} marginX="10%" className="questionnaire-box-int">
          {props.description}
          <br/>
          <Button onClick={handleClick}>
            Start Questionnaire
          </Button>
        </Box>
      </Box>
    </div>
  )
}
export default QreDescription;