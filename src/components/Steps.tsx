import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Box, Button } from "@chakra-ui/react";

const Stepper = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 1
  });

  return (
    <Box width="50%">
      <Steps activeStep={activeStep}>
        <Step label="" key={1}></Step>
        <Step label="" key={2}></Step>
        <Step label="" key={3}></Step>
      </Steps>
    </Box>
  );
};

export default Stepper;
