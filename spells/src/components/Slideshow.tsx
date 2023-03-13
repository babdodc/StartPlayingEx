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

    if (maxSteps === activeStep + 1 ) setPage((prevPage) => prevPage + 1)
    if (activeStep < 0) setPage((prevPage) => prevPage > 0 ? prevPage - 1: 0)

  }, [activeStep,maxSteps])

  useEffect(()=>{
    setMaxSteps( spells ? spells.spells.length  : 0)
    //check if page increase or decrease to set active valu
     pageRef.current > page +1 ? setActiveStep(3) :setActiveStep(0)
    pageRef.current = page + 1;

  },[page,spells])
  return <div className="slideshow">
    <div className="slideshowInnerWrapper">
      {spells && activeStep >= 0 && spells.spells.length > 0 ? <SpellCard key={spells.spells[activeStep].name} spell={spells.spells[activeStep]} /> : null}

    </div>
    <MobileStepper
      steps={maxSteps}
      position="static"
      activeStep={activeStep}
      nextButton={
        <Button
          size="small"
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
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