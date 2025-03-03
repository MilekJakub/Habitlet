import React from "react";
import styled from "styled-components";

const Container = styled.div<{ direction: "row" | "column"; gap: string }>`
  display: flex;
  flex-direction: ${props => props.direction};
  gap: ${props => props.gap};
`;

const Pane = styled.div<{ flex: string }>`
  flex: ${props => props.flex};
`;

export const Split = ({
  children,
  direction = "row",
  gap = "0",
  leftFlex = "1",
  rightFlex = "1",
}: {
  children: [React.ReactNode, React.ReactNode];
  direction?: "row" | "column";
  gap?: string;
  leftFlex?: string;
  rightFlex?: string;
}) => {
  const [Left, Right] = children;

  return (
    <Container direction={direction} gap={gap}>
      <Pane flex={leftFlex}>{Left}</Pane>
      <Pane flex={rightFlex}>{Right}</Pane>
    </Container>
  );
};
