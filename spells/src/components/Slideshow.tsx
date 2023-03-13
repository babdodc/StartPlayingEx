import { useEffect, useState, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useListSpellsQuery } from "../services/spell";
import { SpellCard } from "./SpellCard";
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { useTheme } from '@mui/material/styles';
import { autoPlay } from 'react-swipeable-views-utils';

export const Slideshow = () => {
  const [page, setPage] = useState(0);
  const { data: spells, isLoading, isFetching } = useListSpellsQuery(page);
  const { data: previousSpells } = useListSpellsQuery(page > 0? page-1: 0);
  const { data: nextSpells } = useListSpellsQuery(page+1);

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const [maxSteps,setMaxSteps] = useState(0)
  const pageRef = useRef(0)

  const handleNext = () => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  useEffect(() => {

    if (maxSteps === activeStep && maxSteps !== 0) setPage((prevPage) => prevPage + 1)
    if (activeStep < 0) setPage((prevPage) => prevPage > 0 ? prevPage - 1: 0)


  }, [activeStep,maxSteps])

  useEffect(()=>{
    setMaxSteps( spells ? spells.spells.length  : 0)
    //check if page increase or decrease to set active valu
     pageRef.current > page +1 ? setActiveStep(4) :setActiveStep(0)
    pageRef.current = page + 1;

  },[page,spells])

  return <div className="slideshow">
    <div className="slideshowInnerWrapper">
    
    {activeStep -1 >= 0 ? spells  && spells.spells.length > 0 ? <SpellCard  key={spells.spells[activeStep -1].name} spell={spells.spells[activeStep -1]} increment={-1} onSelect= {handleBack}/> : null
    : page > 0 &&  previousSpells  && previousSpells.spells.length > 0 ? <SpellCard  key={previousSpells.spells[4].name} spell={previousSpells.spells[4]} increment={-1} onSelect= {handleBack}/> : null}


    {spells && activeStep >= 0 && activeStep < spells.spells.length &&  spells.spells.length > 0 ? <SpellCard key={spells.spells[activeStep].name} spell={spells.spells[activeStep]} increment={0}  onSelect={()=>null}/> : null}

      {spells && activeStep  + 1  <  spells.spells.length&& spells.spells.length > 0 ? 
      <SpellCard key={spells.spells[activeStep + 1].name} spell={spells.spells[activeStep + 1]} increment={1} onSelect= {handleNext}/> 
      : nextSpells &&  activeStep  + 1 - maxSteps  >= 0   &&  activeStep  + 1 - maxSteps  < nextSpells.spells.length?  <SpellCard key={nextSpells.spells[activeStep + 1 - maxSteps].name} spell={nextSpells.spells[activeStep + 1 - maxSteps]} increment={1} onSelect= {handleNext}/> : null}

    </div>
    <MobileStepper
      steps={maxSteps}
      position="static"
      activeStep={activeStep}
      nextButton={
        <Button
          size="small"
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1 && nextSpells?.spells.length  ===0}
        >
          Next
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0 && page === 0}>
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  </div>


}