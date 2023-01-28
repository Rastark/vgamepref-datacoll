import {
  Box,
  Flex,
  HStack,
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const LikertSlider: React.FC<{ value: number, onChange(v: any): any }> = (props) => {
  const value = props.value;

  const [sliderState, setSliderState] = useState(false);

  const labelStyles = {
    mt: '3',
    ml: '-1.5',
    fontSize: 'sm',
  }

  return (<>
    <br />
    <Box>
      <Slider
        defaultValue={value}
        min={1}
        max={5}
        step={1}
        onClick={() => {
          setSliderState(true);
          props.onChange(value);
        }}
        onChange={props.onChange}
      >
        <Box position='relative' right={10} />
        <SliderMark value={1} {...labelStyles}>
          <Text>
            1
          </Text>
        </SliderMark>
        <SliderMark value={2} {...labelStyles}>
          <Text>
            2
          </Text>
        </SliderMark>
        <SliderMark value={3} {...labelStyles}>
          <Text>
            3
          </Text>
        </SliderMark>
        <SliderMark value={4} {...labelStyles}>
          <Text>
            4
          </Text>
        </SliderMark>
        <SliderMark value={5} {...labelStyles}>
          <Text>
            5
          </Text>
        </SliderMark>
        <SliderMark
          value={value}
          textAlign='center'
          bg='blue.500'
          color='white'
          mt='-10'
          ml='-7'
          w="auto"
          h="auto"
        >
          {value === 3
            ? "Neutral"
            : value === 1
              ? "Strongly Disagree"
              : value === 2
                ? "Disagree"
                : value === 4
                  ? "Agree"
                  : 5
          }
        </SliderMark>
        <SliderTrack bg='red.300'>
          <SliderFilledTrack bg='green.300' />
        </SliderTrack>
        <SliderThumb defaultValue={value} boxSize={3} />
      </Slider>
    </Box>
  </>
  )
}

export default LikertSlider;