import { Button } from "@chakra-ui/button";
import { SimpleGrid } from "@chakra-ui/react";
import React, { useState } from "react";
import useHasMounted from "../../utils/hasMounted";

const NavButtons: React.FC<{
  isNextDisabled: boolean,
  length: number,
  currId: number,
  setCurrId: (id: number) => void
}> = (props) => {

  {/* Question change buttons logic */}
  const handlePrev = () => props.setCurrId(Math.max(props.currId - 1, 0));
  const handleNext = () => props.setCurrId(Math.min(props.currId + 1, props.length-1));
  const isFirst = props.currId === 0;
  const isLast = props.currId === props.length-1;
  const isNextDisabled = props.isNextDisabled

  return (!useHasMounted 
    ? <></>
    : <div className="nav-buttons">
    <SimpleGrid columns={2} spacingX="5">
    <Button 
      isDisabled={ isFirst } 
      onClick={ handlePrev }>
        Prev
    </Button>
    <Button 
      isDisabled={ isLast || isNextDisabled} 
      onClick={ handleNext }>
        Next
    </Button>
    </SimpleGrid>
    </div>
  )
}

export default NavButtons;