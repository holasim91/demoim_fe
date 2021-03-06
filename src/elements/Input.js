import React from 'react'
import styled from "styled-components";
import { Text, Grid } from './index';


const Input = (props) => {

  const { label, placeholder, multiLine, _onChange, type, width, margin, padding, _onClick, value, modal, bg } = props;

  const styles = {
    width: width,
    margin: margin,
    padding: padding,
    modal: modal,
    bg: bg,
  }

  if (multiLine) {
    return (
      <Grid>
        { label && <Text margin="0px 0px 6px 4px">{label}</Text>}
        <ElTextarea {...styles} placeholder={placeholder} onChange={_onChange} rows={5} value={value} />
      </Grid>
    )
  }

  return (
    <React.Fragment>
      { label && <Text margin="0px 0px 8px 4px">{label}</Text>}
      <ElInput {...styles} type={type} placeholder={placeholder} onClick={_onClick} onChange={_onChange} value={value} />
    </React.Fragment>
  )
}

Input.defaultProps = {
  placeholder: '텍스트를 입력해주세요.',
  _onChange: () => { },
  _onClick: () => { },
  type: 'text',
  value: '',
  width: '100%',
  margin: false,
  padding: false,
  label: false,
  multiLine: false,
  modal: false,
  bg: false,
}

const ElInput = styled.input`
  box-sizing: border-box;
  border:1px solid #ccc;
  border-radius: 3px;
  padding: ${(props) => props.padding ? `${props.padding};` : '19px 19px;'};
  outline: none;
  width: ${(props) => props.width};
  box-sizing: border-box;
  ${(props) => props.margin ? `margin:${props.margin};` : ''}
  ${(props) => props.modal ? 'background-color:#f1f1f1;border:1px solid #f1f1f1;' : ''}
  ${(props) => props.bg ? `background-color:${props.bg}; border:1px solid ${props.bg};` : ''}
  &::placeholder{
    color:#8E8E8E;
    font-weight: 500;
  }

`
const ElTextarea = styled.textarea`
  border:1px solid #ccc;
  border-radius: 3px;
  width: ${(props) => props.width};
  padding: ${(props) => props.padding ? `${props.padding};` : '12px;'};
  ${(props) => props.margin ? `margin:${props.margin};` : ''}
  box-sizing:border-box;
  resize: none;
  outline: none;
  ${(props) => props.modal ? 'background-color:#f1f1f1;border:1px solid #f1f1f1;' : ''}
  &::placeholder{
    color:#8E8E8E;
    font-weight: 500;
  }

`;


export default Input;