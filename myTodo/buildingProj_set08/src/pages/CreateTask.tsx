import React, { useState } from "react";
import { styled } from "styled-components";
import { GiCancel } from "react-icons/gi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createData } from "../api/Api";
interface iToggle {
  toggle: any;
  setToggle: any;
}

export const CreateTask: React.FC<iToggle> = ({ toggle, setToggle }) => {
  const [text, setText] = useState("");

  const [dateRange, setDateRange]: any = useState([null, null]);
  const [startDate, endDate]: any = dateRange;

  // let left = Date.parse(dateRange[1]) - Date.parse(dateRange[0]);
  // console.log(left / 86400000);

  return (
    <div>
      <Container>
        <Wrapper>
          <Icon
            onClick={() => {
              setToggle(false);
            }}
          >
            <GiCancel />
          </Icon>
          <Hold>
            <Text
              value={text}
              placeholder="Enter Task"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <Time
              placeholderText="Enter you task date deadline"
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update: [Date | null, Date | null] | any) => {
                setDateRange(update);
              }}
              isClearable={true}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Done
                onClick={() => {
                  let data = {
                    task: text,
                    time: dateRange,
                  };
                  console.log(data);

                  createData(data);
                  setToggle(false);
                }}
              >
                Add Task
              </Done>
            </div>
          </Hold>
        </Wrapper>
        <Wrap
          onClick={() => {
            setToggle(false);
          }}
        ></Wrap>
      </Container>
    </div>
  );
};

const Wrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const Icon = styled.div`
  padding: 10px;
`;
const Done = styled.div`
  padding: 10px 15px;
  background-color: #e2445c;
  margin-top: 50px;
  border-radius: 5px;
  color: white;
`;
const Time = styled(DatePicker)`
  height: 50px;
  width: 310px;
  background-color: white;
  padding-left: 5px;
  border-radius: 5px;
  margin-top: 20px;
  color: black;
`;
const Text = styled.textarea`
  width: 90%;
  height: 300px;
  background-color: white;
  color: black;
`;
const Hold = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 800px;
  height: 600px;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  z-index: 5;
`;
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(235, 228, 241, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
`;
