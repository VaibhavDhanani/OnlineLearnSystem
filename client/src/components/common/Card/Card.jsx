import React from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const CardContainer = styled.div`
  font-family: "Poppins", sans-serif;
  background: #2e2e2e;
  color: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
`;

const Subject = styled.h3`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: #999;
  margin-bottom: 15px;
`;

const ExploreButton = styled.button`
  background: #5b98eb;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #4a7ac7;
  }
`;

const Card = ({ classData }) => {
  const { subject, description } = classData;
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate(`/home/${subject}`);
  }

  return (
    <CardContainer>
      <Subject>{subject}</Subject>
      <Description>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque optio repellendus delectus quibusdam accusantium sunt?
        
        {/* {description.length > 15 ? `${description.substring(0, 15)}...` : description} */}
      </Description>
      <ExploreButton onClick={handleExploreClick}>
        Explore
      </ExploreButton>
    </CardContainer>
  );
};

export default Card;