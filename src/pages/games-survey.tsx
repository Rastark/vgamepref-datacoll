import { loadGames } from "../lib/load-games"
import { useForm } from 'react-hook-form';
import { Flex, Box } from "@chakra-ui/react";
import { GroupBase, OptionBase, Select } from 'chakra-react-select';
import useHasMounted from "../utils/hasMounted";
import { useEffect, useState } from "react";
import React from "react";
import GamesForm from "../common/GamesForm";


type GameProps = Array<{ id: number, name: string }>;

interface GameOption extends OptionBase {
  id: number;
  name: string;
}

function gamesSurvey ({ games }: { games: GameProps }) {

  const hasMounted = useHasMounted();
  const gamesForm = GamesForm(games);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstgame: '',
      secondgame: '',
      thirdgame: ''
    }
  });

  console.log(watch());
  console.log("our games:", games)
  return (<>
    {hasMounted && gamesForm}
    </>)
}

{/* { <input
          {...register('firstgame', { required: 'This is required' })}
          placeholder='First Game (Required)'
        />
        <p>{errors.firstgame?.message}</p>
        <input
          {...register('secondgame')}
          placeholder='Second Game'
        />
        <p>{errors.secondgame?.message}</p>
        <input
          {...register('thirdgame')}
          placeholder='Third Game'
        />
        <p>{errors.thirdgame?.message}</p>
        <input type='submit' /> } */}

export async function getServerSideProps() {
  const games = await loadGames();

  return {
    props: {
      games,
    },
  }
}

export default gamesSurvey