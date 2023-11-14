import styled from "styled-components";

export const Header = () => {
  return (
    <div>
      <Container>
        <Wrapper>My ToDo</Wrapper>
      </Container>
    </div>
  );
};

const Wrapper = styled.div`
  width: 95%;
  /* background-color: white; */
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: 600;
`;

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
`;
