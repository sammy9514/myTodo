import { styled } from "styled-components";
import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { CreateTask } from "./CreateTask";

export const SideCard = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <Container>
        <Wrapper>
          <Sider>
            <Create
              onClick={() => {
                setToggle(true);
              }}
            >
              <IoAddCircleOutline />
            </Create>
          </Sider>
        </Wrapper>
      </Container>
      {toggle && <CreateTask setToggle={setToggle} toggle={toggle} />}
    </div>
  );
};

const Create = styled.div`
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;

  &:hover {
  }
`;
const Sider = styled.div``;
const Wrapper = styled.div`
  width: 100%;
  height: 65px;
  background-color: whitesmoke;
`;
const Container = styled.div`
  width: 70px;
  height: 80vh;
  display: flex;
  margin-left: 20px;
  align-items: center;
`;
