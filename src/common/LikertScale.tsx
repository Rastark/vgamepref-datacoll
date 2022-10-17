import { 
    Radio, 
    RadioGroup, 
    Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { QuestionProps, BHIQuestion } from "../types_interfaces/types";

const LikertScale: React.FC<{value: string, onChange(v:any): any}> = (props) => {
    const value = props.value;
    return(<>
    <RadioGroup 
        value={value}
        onChange={props.onChange}
        >
        <Stack direction='row'>
            <Radio value='1' size='lg'>Strongly Disagree</Radio>
            <Radio value='2' size='md'>Disagree</Radio>
            <Radio value='3' size='sm'>Neutral</Radio>
            <Radio value='4' size='md'>Agree</Radio>
            <Radio value='5' size='lg'>Strongly Agree</Radio>
        </Stack>
    </RadioGroup></>
    )
}

export default LikertScale;