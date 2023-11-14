import { styled } from "styled-components";
import { SideCard } from "./SideCard";
import { FiTrash2 } from "react-icons/fi";
import { IoMdDoneAll } from "react-icons/io";
import { useEffect, useState } from "react";
import { createData, deleteOne, readAllData, updateData } from "../api/Api";
import moment from "moment";
import { CreateTask } from "./CreateTask";
import { IoAddCircleOutline } from "react-icons/io5";
import alarmSound from "../assets/nyse_opening_bell.mp3";

export const Hero = () => {
  const [state, setState] = useState<Array<{}>>();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    readAllData().then((res: any) => {
      setState(res);
    });
  }, [state]);

  let filter1 = state?.filter((el: any) => {
    return el.done === "start";
  });
  let filter2 = state?.filter((el: any) => {
    return el.done === "ongoing";
  });
  let filter3 = state?.filter((el: any) => {
    return el.done === "done";
  });

  const setAlarm = () => {
    setTimeout(() => {
      let audio = new Audio(alarmSound);

      audio.play();
    }, 0);
  };

  // setAlarm();

  return (
    <div style={{ display: "flex", gap: "100px" }}>
      <SideCard />

      <Container>
        <Wrapper>
          <CardWrap>
            <Top bcc="#e2445c">
              Start Task | {filter1?.length}{" "}
              <Create
                onClick={() => {
                  setToggle(true);
                }}
              >
                <IoAddCircleOutline />
              </Create>
            </Top>
            {state &&
              filter1?.map((props: any) => (
                <Card>
                  <Main key={props._id}>
                    <Task>{props.task}</Task>
                    <Created>
                      Created At:{" "}
                      {moment(Date.parse(props.createdAt)).format("LLLL")}
                    </Created>
                    <DeadLine>Dead Line: {props.deadLine}</DeadLine>

                    <FunctionBtn>
                      <Done
                        onClick={() => {
                          updateData(props._id);
                        }}
                        bcc="#e2445c"
                      >
                        Start Task
                      </Done>
                      <Del
                        onClick={() => {
                          deleteOne(props._id);
                        }}
                      >
                        <FiTrash2 />
                      </Del>
                    </FunctionBtn>
                  </Main>
                </Card>
              ))}
          </CardWrap>
          <CardWrap>
            <Top bcc="#f2ab3e">Pending Task | {filter2?.length}</Top>
            {state &&
              filter2?.map((props: any) => (
                <Card>
                  <Main key={props._id}>
                    <Task>{props.task}</Task>
                    <Created style={{ marginTop: "30px" }}>
                      Time Left: {props.left} day(s) left
                    </Created>
                    {/* <DeadLine>Time Left:</DeadLine> */}

                    <FunctionBtn>
                      <Done
                        onClick={() => {
                          updateData(props._id);
                          console.log(updateData(props._id));
                        }}
                        bcc="#f2ab3e"
                      >
                        Done
                      </Done>
                      <Del
                        onClick={() => {
                          deleteOne(props._id);
                        }}
                      >
                        <FiTrash2 />
                      </Del>
                    </FunctionBtn>
                  </Main>
                </Card>
              ))}
          </CardWrap>
          <CardWrap>
            <Top bcc="#50C874">Finshed Task | {filter3?.length}</Top>
            {state &&
              filter3?.map((props: any) => (
                <Card>
                  <Main>
                    <Task>{props.task}</Task>
                    <Created style={{ marginTop: "30px" }}>
                      Finished In: {props.left} day(s)
                    </Created>

                    <FunctionBtn style={{ marginTop: "20px" }}>
                      {/* <Done>Done</Done> */}
                      <Done1>
                        <IoMdDoneAll />
                      </Done1>
                      <Del
                        onClick={() => {
                          deleteOne(props._id);
                        }}
                      >
                        <FiTrash2 />
                      </Del>
                    </FunctionBtn>
                  </Main>
                </Card>
              ))}
          </CardWrap>
        </Wrapper>
        {toggle && <CreateTask setToggle={setToggle} toggle={toggle} />}
      </Container>
    </div>
  );
};

const Create = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 100%;
  height: 60px; */

  &:hover {
  }
`;

const Top = styled.div<{ bcc: string }>`
  width: 97.5%;
  height: 70px;
  background-color: ${({ bcc }) => bcc};
  border-radius: 10px 10px 0 0;
  display: flex;
  align-items: center;
  padding-left: 10px;
  color: white;
  font-size: 17px;
  font-weight: 500;
  position: sticky;
  top: 0;
  z-index: 0;
  gap: 10px;
`;
const Del = styled.div`
  font-size: 18px;
`;
const Done1 = styled.div`
  font-size: 20px;
  color: #50c874;
`;
const Done = styled.div<{ bcc: string }>`
  padding: 10px 15px;
  border-radius: 10px;
  background-color: ${({ bcc }) => bcc};
  color: white;
`;
const FunctionBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;
const DeadLine = styled.div`
  font-size: 14px;
  /* margin-bottom: 7px; */
`;
const Created = styled.div`
  margin: 13px 0;
  font-size: 14px;
`;
const Task = styled.div`
  width: 95%;
  height: 100px;
  border: 1px solid #a2a09d;
  padding: 10px;
`;
const Main = styled.div`
  width: 90%;
  height: 260px;
  background-color: #80808014;
  border-radius: 8px;
  padding: 10px;
`;
const Card = styled.div`
  width: 100%;
  min-height: 300px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CardWrap = styled.div`
  width: 500px;
  height: 100%;
  background-color: whitesmoke;
  border-radius: 10px;
  overflow-x: auto;
`;
const Wrapper = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
