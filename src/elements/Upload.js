import React from "react";
import styled from "styled-components";

const Upload = (props) => {


  const fileRef = React.useRef();
  const [fileName, setFileName] = React.useState("파일 선택하기");

  const changeFile = () => {



  }

  return (
    <React.Fragment>
      <FileBox>
        <label htmlFor="img-file">업로드</label>
        <input type="file" id="img-file" ref={fileRef} />
        <input type="text" className="uploadImg" value={fileName} readOnly />
      </FileBox>
    </React.Fragment>
  )
}

export default Upload;

const FileBox = styled.div`

  & input[type="file"]{
    position: absolute;
    width:0;
    height:0;
    padding:0;
    overflow:hidden;
    border:0;
  }

  & label{
    display: inline-block;
    padding:6px 17px;
    color:#999;
    vertical-align: middle;
    background-color: #fdfdfd;
    cursor: pointer;
    border:1px solid #ebebeb;
    border-radius: 5px;
    font-size:14px;
  }

  & .uploadImg{
    display: inline-block;
    height: 25px;
    font-size:14px;
    padding:0 10px;
    vertical-align: middle;
    background-color: #f5f5f5;
    border:1px solid #ebebeb;
    margin-left: 4px;
    border-radius:3px;
    color:gray;
    outline:none;
  }

`;

