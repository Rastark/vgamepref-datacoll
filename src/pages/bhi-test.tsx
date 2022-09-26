import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import BHITest from "../common/BHITest";
import { QuestionProps } from "../types/types";

const bhi_test = ({ items }: { items: QuestionProps }) => {
  console.log("bhi_test", items)

  const [showFinalResults, setFinalResults] = useState(false);
  const questions = items;


  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
    <Flex direction="column" background="gray.100" p={12} rounded={6}>
    { showFinalResults ? (
      <div className="final-results">
      </div>
    ) : (
          <BHITest {...questions} />

    )}
    </Flex>
    </Flex>
  )}

export async function getServerSideProps() {

    const items =
      await fetch("http://localhost:3000/api/bhi")
        .then(async response => await response.json());
    // .then(json => console.log(json)) 

    return {
      props: { items },
    }
  }

  export default bhi_test;