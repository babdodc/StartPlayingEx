import { useEffect, useState,useMemo } from "react"
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

export const Slideshow = () =>
{
    const [page, setPage] = useState(0);
    const { data: spells, isLoading, isFetching } = useListSpellsQuery(page);
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleStepChange = (step: number) => {
        setActiveStep(step);
      };
    const currentSpells = useMemo(()=>{
        if (!spells) return null
        return spells.spells.map((t)=> <SpellCard spell ={t}/>)
    },[spells])

    const maxSteps = spells?spells.spells.length : 0;
      
       
      
  //   return (
  //     <div>
  //         <Box sx={{ flexGrow: 1 }}>
  //           <div className="cardOuterWrapper" >
  //           {/* <Paper
  //             square
  //             elevation={0}
  //             sx={{
  //               display: 'flex',
  //               alignItems: 'spaceAround',
  //               height: "100%",
  //               pl: 2,
  //               bgcolor: 'background.default',
  //             }}
  //           >
  //             <Typography>{spells?.spells[activeStep].name}</Typography>
  //             <Typography>{spells?.spells[activeStep].school}</Typography>

  //           </Paper> */}
  //           {/* <AutoPlaySwipeableViews
  //             axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
  //             index={activeStep}
  //             onChangeIndex={handleStepChange}
  //             enableMouseEvents
  //           >
  //             {spells?.spells.map((step, index) => (
  //               <div key={step.name}>
  //                 {Math.abs(activeStep - index) <= 2 ? (
  // <div className="cardInnerWrapper" style={{backgroundColor:"darkgrey"}}>                
  // <img style={{objectFit:"contain", height:"100%"}} src={spells?.spells[activeStep].image}/>
  // </div>                    ) : null}
  //               </div>

                
  //             ))}
  //           </AutoPlaySwipeableViews> */}
  // {/* <div className="cardInnerWrapper" style={{backgroundColor:"darkgrey"}}>                
  // <img style={{objectFit:"contain", height:"100%"}} src={spells?.spells[activeStep].image}/>
  // </div>    */}
  // {spells? <SpellCard spell={spells?.spells[activeStep]}/>     : null}
  // </div>
  //           <MobileStepper
  //             steps={maxSteps}
  //             position="static"
  //             activeStep={activeStep}
  //             nextButton={
  //               <Button
  //                 size="small"
  //                 onClick={handleNext}
  //                 disabled={activeStep === maxSteps - 1}
  //               >
  //                 Next
  //                 {theme.direction === 'rtl' ? (
  //                   <KeyboardArrowLeft />
  //                 ) : (
  //                   <KeyboardArrowRight />
  //                 )}
  //               </Button>
  //             }
  //             backButton={
  //               <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
  //                 {theme.direction === 'rtl' ? (
  //                   <KeyboardArrowRight />
  //                 ) : (
  //                   <KeyboardArrowLeft />
  //                 )}
  //                 Back
  //               </Button>
  //             }
  //           />
  //         </Box>

  //         </div>
  //       );
      
  return <div className="slideshow">
  <div className="slideshowInnerWrapper">
   {spells? <SpellCard spell={spells?.spells[activeStep]}/>     : null}
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
    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
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