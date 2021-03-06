import React from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
const DatePick = (props) => {

  const { isRange } = props;

  //endDate 초기값
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  //let date = new Date();
  //let yesterday = new Date(date.setDate(date.getDate()+1))
  let today = new Date();
  //밑에서 today는 새로운 객체를 반환하지 않고 변했다.
  const [startDate, setStartDate] = React.useState(new Date(today.setDate(today.getDate() + 1)));
  const [endDate, setEndDate] = React.useState(new Date(today.setDate(today.getDate() + 1)));



  //const [endDate, setEndDate] = React.useState(new Date().setDate(new Date().getDate() + 2));
  //const [startDate, setStartDate] = React.useState(new Date().setDate(new Date().getDate() + 1));
  console.log('시작일:' + startDate);
  console.log('마감일:' + endDate);

  console.log('시작일 밀리초:' + startDate.getTime());
  console.log('마감일 밀리초:' + endDate.getTime());

  const ExampleCustomInput = React.forwardRef(
    ({ value, onClick }, ref) => (
      <PickBtn onClick={onClick} ref={ref}>
        {value}
      </PickBtn>
    ),
  );

  const ExampleCustomInputRange = React.forwardRef(
    ({ value, onClick }, ref) => (
      <RangePickBtn onClick={onClick} ref={ref}>
        {value}
      </RangePickBtn>
    ),
  );

  if (isRange) {

    return (
      <RangeBox>
        <DatePicker
          locale={ko}
          selected={startDate}
          onChange={date => setStartDate(date)}
          customInput={<ExampleCustomInputRange />}
          popperPlacement="auto"
          minDate={new Date().setDate(new Date().getDate() + 1)}
          closeOnScroll={true}
          startDate={startDate}
          selectsStart
        />
        <Sign>-</Sign>
        <DatePicker
          locale={ko}
          selected={endDate}
          onChange={date => setEndDate(date)}
          customInput={<ExampleCustomInputRange />}
          popperPlacement="auto"
          minDate={startDate}
          endDate={endDate}
          selectsEnd
          closeOnScroll={true}
        />
      </RangeBox>
    )
  }

  return (
    <DatePicker
      locale={ko}
      selected={startDate}
      onChange={date => setStartDate(date)}
      customInput={<ExampleCustomInput />}
      popperPlacement="auto"
      minDate={tomorrow}
      closeOnScroll={true}
    />
  );
};

export default DatePick;

const PickBtn = styled.button`
  border-radius: 10px;
  padding:3px 10px;
  background-color: ${props => props.theme.button_purple};
  border:1px solid ${props => props.theme.button_purple};
  color:#ffffff;
`;

const RangeBox = styled.div`
  display: flex;
  background-color: ${props => props.theme.button_purple};
  width:165px;
  border-radius: 10px;
  padding:2px 5px;
;`

const RangePickBtn = styled.button`
  color:#ffffff;
  padding:3px 6px;
  outline: none;
  border:none;
  background-color: transparent;
`;

const Sign = styled.p`
  position: relative;
  top:2px;
  color: #ffffff;
`;