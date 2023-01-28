import { Box, Button, Flex, FormControl, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { answersSnap, getDoc } from "../utils/insertJson";

const Result_viz: React.FC<{
}> = (props) => {

  const [resultsId, setResultsId] = useState("");
  const [resultData, setResultData] = useState("");

  const handleInputChange = (input: string) => 
    setResultsId(input)

  const handleSubmit = async (value: string) => {
    // const doc = getDoc("hexaco-tests", "BZuE8hHPJU6g8xolmSoY");
    // setResultData(((await doc).data).toString)
    const doc = (await answersSnap).data()
    console.log(doc)
  }

  return (
    <Box height="100vh" alignItems="center" justifyContent="center" className="page-box-ext">
      <Box background="gray.100" p={12} rounded={6} className="page-box-int">
        <FormControl>
        <Input value={"" + resultsId.toString()} onChange={handleInputChange} />
        <Button
          type={"submit"}
          onClick={handleSubmit}>
          Submit
        </Button>
        </FormControl>
        {resultData}
      </Box>
    </Box>
  )
}

export default Result_viz;