// src/BMICalculator.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSpring, animated } from 'react-spring';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const welcomeAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
  });

  const resultAnimation = useSpring({
    opacity: showResult ? 1 : 0,
    transform: showResult ? 'translateY(0)' : 'translateY(-20px)',
  });

  const preloadAnimation = useSpring({
    opacity: showWelcome ? 1 : 0,
    transform: showWelcome ? 'translateY(0)' : 'translateY(-20px)',
  });

  const handleButtonClick = () => {
    setShowWelcome(false);
    setTimeout(() => {
      setShowCalculator(true);
    }, 500);
  };

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));
      determineBMICategory(bmiValue);
      setShowResult(true);
    }
  };

  const determineBMICategory = (bmi) => {
    if (bmi < 18.5) setCategory('Underweight');
    else if (bmi >= 18.5 && bmi < 24.9) setCategory('Normal weight');
    else if (bmi >= 25 && bmi < 29.9) setCategory('Overweight');
    else setCategory('Obese');
  };

  return (
    <Container>
      {showWelcome && (
        <Preload style={preloadAnimation}>
          <PreloadText>Hi there👋 , do you want to check your weight or height?</PreloadText>
          <PreloadButton onClick={handleButtonClick}>Yes</PreloadButton>
        </Preload>
      )}
      {showCalculator && (
        <>
          <Welcome style={welcomeAnimation}>Welcome to the BMI Calculator</Welcome>
          <Card>
            <Title>BMI Calculator</Title>
            <Form>
              <Input
                type="number"
                placeholder="Height (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <Button onClick={calculateBMI}>Calculate</Button>
            </Form>
            <ResultContainer>
              <animated.div style={resultAnimation}>
                {showResult && (
                  <>
                    <Result>Your BMI is: <strong>{bmi}</strong></Result>
                    <Category category={category}>Category: <strong>{category}</strong></Category>
                  </>
                )}
              </animated.div>
            </ResultContainer>
          </Card>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  font-family: 'Arial', sans-serif;
  padding: 0 1rem;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Welcome = styled(animated.h2)`
  color: #fff;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  animation: ${fadeIn} 2s ease-in-out;
`;

const Preload = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 2rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  position: absolute;
`;

const PreloadText = styled.p`
  margin-bottom: 1rem;
`;

const PreloadButton = styled.button`
  padding: 0.5rem 1rem;
  background: #ff6f61;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
  &:hover {
    background: #e55d5d;
    transform: scale(1.05);
  }
`;

const Card = styled.div`
  background: #fff;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 40px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 1rem;
  margin: 0.5rem 0;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  transition: border-color 0.3s;
  &:focus {
    border-color: #ff6f61;
    outline: none;
  }

  @media (max-width: 768px) {
    max-width: 250px;
  }

  @media (max-width: 480px) {
    max-width: 200px;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  margin-top: 1rem;
  background: #ff6f61;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
  &:hover {
    background: #e55d5d;
    transform: scale(1.05);
  }
`;

const ResultContainer = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const Result = styled.p`
  font-size: 1.75rem;
  margin: 0.5rem 0;
  color: #333;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Category = styled.p`
  font-size: 1.5rem;
  margin: 0.5rem 0;
  color: ${({ category }) => {
    switch (category) {
      case 'Underweight':
        return '#ffc107';
      case 'Normal weight':
        return '#28a745';
      case 'Overweight':
        return '#fd7e14';
      case 'Obese':
        return '#dc3545';
      default:
        return '#333';
    }
  }};

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

export default BMICalculator;
