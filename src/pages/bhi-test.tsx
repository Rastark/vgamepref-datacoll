import { Button, Flex  } from "@chakra-ui/react";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import BHITest from "../common/BHITest";
import Demographics from "../common/Demographics";
import FinalResults from "../common/FInalResults";
import { DemographicOption } from "../types_interfaces/interfaces";
import { QuestionProps, BHIQuestion, DemographicQuestion, FormItem, QuestionnaireAnswers } from "../types_interfaces/types";
import { addNewDoc } from "../utils/insertJson";

const bhi_test = ({ bhiProps, demographicProps }: { 
    bhiProps: QuestionProps<BHIQuestion>, 
    demographicProps: QuestionProps<DemographicQuestion> })=> {
  
  console.log("demographic_test", demographicProps);
  
  // react-hook-form init
  // const methods = useForm();
  // const { register, handleSubmit, watch, formState: {errors} } = methods;
  const handleSubmit = () => {
    console.log("questionnaire answers: ", answers);
    addNewDoc(answers, "hexaco-tests");
  };

  const handleFakeSubmit = () => {
    console.log("questionnaire answers: ", answers);
  }
  

  // state declarations
  const [demographicQuestions, setDemographicQuestions] = useState({
    show: true, 
    formData: Array<FormItem>(demographicProps.items.length).fill({id: -1, selectedOption: ""})
  });

  const [bhiQuestions, setBhiQuestions] = useState({
    show: true, 
    formData: Array<FormItem>(bhiProps.items.length).fill({id: -1, selectedOption: ""})
  });

  console.log("bhi_test", bhiProps);
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

  const answers: QuestionnaireAnswers = {
    demographics: demographicQuestions.formData,
    answers: bhiQuestions.formData
  };

  const updateDemographics = (input: {show: boolean, formData: FormItem[]}) => 
    setDemographicQuestions(input);

  const updateBhi = (input: {show: boolean, formData: FormItem[]}) => 
    setBhiQuestions(input);

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
    <Flex direction="column" background="gray.100" p={12} rounded={6}>
    <Button onClick={handleFakeSubmit}>Fake Submit</Button>
      { demographicQuestions.show ? (
        <div className="demographic-questions">
          <Demographics 
            questionProps={demographicProps} 
            showToggle={toggleDemographicShow} 
            formData={updateDemographics}
          />
        </div>
        ) : (
          bhiQuestions.show ? (
            <BHITest 
              questionProps={bhiProps} 
              showToggle={toggleBhiShow}
              formData={updateBhi}
            />
            ) : (
              <div>
                <FinalResults />
                <Button onClick={handleSubmit}>Submit Questionnaire</Button>
                {/* <input type="submit"/>       */}
              </div>
            )
        )}
    </Flex>
    </Flex>
  )}

export async function getServerSideProps() {

    const bhiProps =
      await fetch("http://localhost:3000/api/bhi")
        .then(async response => await response.json())
        // .then(json => console.log(json)); 

    const demographicProps = 
      await fetch("http://localhost:3000/api/demographics")
        .then(async response => await response.json());

    return {
      props: { bhiProps, demographicProps },
    }
  }

  export default bhi_test;
