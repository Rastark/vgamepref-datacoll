import { Button, Flex  } from "@chakra-ui/react";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import BhiQre from "../common/BhiQre";
import DemographicQre from "../common/DemographicQre";
import FinalResults from "../common/FInalResults";
import SelfDetQre from "../common/SelfDetQre";
import { QuestionOption } from "../types_interfaces/interfaces";
import { JsonProps, BHIQuestion, DemographicQuestion, FormItem, QuestionnaireAnswers, SelfDetQuestion } from "../types_interfaces/types";
import { addNewDoc } from "../utils/insertJson";

const bhi_test = ({ bhiProps, demographicProps, selfDetProps }: { 
    bhiProps: JsonProps<BHIQuestion>, 
    demographicProps: JsonProps<DemographicQuestion>,
    selfDetProps: JsonProps<SelfDetQuestion>})=> {
  
  console.log("demographic_test", demographicProps);
  
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
    formData: Array<FormItem>(demographicProps.items.length).fill({id: -1, selectedOption: ""})
  });

  const [bhiQuestions, setBhiQuestions] = useState({
    show: true, 
    formData: Array<FormItem>(bhiProps.items.length).fill({id: -1, selectedOption: ""})
  });

  const [selfDetQuestions, setSelfDetQuestions] = useState({
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
  
  const toggleSelfDetShow = () =>
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

  const updateSelfDet = (input: {show: boolean, formData: FormItem[]}) => 
    setSelfDetQuestions(input);

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
    <Flex direction="column" background="gray.100" p={12} rounded={6}>
    <Button onClick={handleFakeSubmit}>Fake Submit</Button>
    { demographicQuestions.show 
      ? <div 
          className="demographic-questions"
        >
        <DemographicQre 
          questionProps={demographicProps} 
          showToggle={toggleDemographicShow} 
          formData={updateDemographics}
        />
      </div>
      : bhiQuestions.show 
      ? <BhiQre 
          questionProps={bhiProps} 
          showToggle={toggleBhiShow}
          formData={updateBhi}
        />
      : selfDetQuestions.show
      ? <SelfDetQre
          questionProps={selfDetProps}
          showToggle={toggleSelfDetShow}
          formData={updateSelfDet} 
        />
      : <div>
          <FinalResults />
          <Button 
            onClick={handleSubmit}>
              Submit Questionnaire
          </Button>
        </div>
      }
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

    const selfDetProps = 
      await fetch("http://localhost:3000/api/bpnsfs")
        .then(async response => await response.json());

    return {
      props: { bhiProps, demographicProps, selfDetProps },
    }
  }

  export default bhi_test;
