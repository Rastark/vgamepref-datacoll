import { Flex, GridItem } from "@chakra-ui/react";
import { AsyncSelect, GroupBase, OptionBase, Select } from "chakra-react-select";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface GameOption extends OptionBase {
  id: number
  name: string;
  // label: string;
}

type GameProps = Array<{ id: number, name: string }>;

const GameForm: React.FC<GameProps> = (props) => {

  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);

  const {
    register,
    // handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstgame: '',
      secondgame: '',
      thirdgame: ''
    }
  });

  const handleChange = (selectedOption: any) => {
      console.log(selectedOption.name);
      setSelectedValue(selectedOption);
      console.log(selectedValue);

  }

  const handleSubmit = () => {
    alert('Your favourite game is: ' + selectedValue);
  }

  const loadOptions = (inputValue: string, callback: (arg0: { id: number; name: string; }[]) => void) => {
    setTimeout(() => {
      const values = props.filter((i: any) =>
      i.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      callback(values);
    }, 3000);
  }
  
  return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <Flex direction="column" background="gray.100" p={12} rounded={6}>
            <div>
              <p>Considering all games you ever played, which ones were the best?</p>
              <form
                onSubmit={handleSubmit}
              >
                <AsyncSelect<GameOption, true, GroupBase<GameOption>>
                  cacheOptions
                  defaultOptions
                  options={props}
                  name="value"
                  getOptionLabel={e => e.name}
                  getOptionValue={e => e.id.toString()}
                  placeholder="First Game (Required)"
                  closeMenuOnSelect={false}
                  onChange={handleChange}  
                  loadOptions={loadOptions}
                  value={selectedValue}

                />
                <input type="submit"/>
              </form>
            </div>
          </Flex>
        </Flex>
      )
    }

export default GameForm;