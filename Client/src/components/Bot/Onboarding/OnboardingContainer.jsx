import React, { useState } from "react";
import Step1UserDetails from "./Step1UserDetails";
import Step2Goals from "./Step2Goals";
import Step3Confidence from "./Step3Confidence";
import Step4TimeAvailability from "./Step4TimeAvailability";
import StepAddictionDetails from "./StepAddictionDetails"; // Import new step
import StepSocialLife from "./stepSocialLife"; // Import the Social Life step
import Summary from "./Summary";

const OnboardingContainer = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    goals: [],
    confidenceLevels: {},
    timeAvailability: "",
    addiction: "", // New field for Addiction
  });

  const updateUserData = (key, value) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = (specialStep = null) => {
    if (specialStep === "addiction") {
      setStep(3); // Go directly to Addiction step
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  // Dynamically adjust the steps array based on selected goals
  const steps = [
    <Step1UserDetails data={userData} update={updateUserData} next={nextStep} />,
    <Step2Goals data={userData} update={updateUserData} next={nextStep} back={prevStep} />,
    // Add the Addiction step if "Addiction" is a selected goal
    ...(userData.goals.includes("Addiction") ? [
      <StepAddictionDetails data={userData} update={updateUserData} next={nextStep} back={prevStep} />
    ] : []),
    // Add the Social Life step if "Social Life" is a selected goal
    ...(userData.goals.includes("Social Life") ? [
      <StepSocialLife data={userData} update={updateUserData} next={nextStep} back={prevStep} />
    ] : []),
    <Step3Confidence data={userData} update={updateUserData} next={nextStep} back={prevStep} />,
    <Step4TimeAvailability data={userData} update={updateUserData} next={nextStep} back={prevStep} />,
    <Summary data={userData} onComplete={onComplete} back={prevStep} />,
  ];

  return <div className="onboarding-container">{steps[step - 1]}</div>;
};

export default OnboardingContainer;
