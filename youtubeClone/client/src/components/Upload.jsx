import React, { useEffect } from 'react'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
    z-index: 10000000;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000000a7;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    width: 30%;
    min-width: 350px;
    min-height: 500px;
    height: 60%;
    max-width: 600px
    max-height: 600px;
    background-color: ${({theme})=> theme.bgLighter};
    color: ${({theme})=> theme.text};
    border: 1px solid ${({theme})=> theme.textLighter};
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    border-radius: 5px;
`

const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    padding: 3px;
`


const Title = styled.h1`
    text-align: center;
`

const Input = styled.input`
    border: 1px solid ${({theme})=> theme.soft};
    color: ${({theme})=> theme.text};
    border-radiuse: 3px;
    padding: 10px;
    background-color: transparent;

`

const Desc = styled.textarea`
    border: 1px solid ${({theme})=> theme.soft};
    color: ${({theme})=> theme.text};
    border-radiuse: 3px;
    padding: 10px;
    background-color: transparent;
    resize: none;
    
`

const Button = styled.button`
    border-radius: 5px;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    background-color:  ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.textSoft};
    border: 1px solid ${({ theme }) => theme.text};
    width: fit-content;
    position: absolute;
    bottom: 5%;
    right: 5%;

`

const Label = styled.label`
    font-size: 14px;
`


const Upload = ({ setOpen }) => {
    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [imgPerc, setImgPerc] = useState(0);
    const [videoPerc, setVideoPerc] = useState(0);
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([]);
  
    const navigate = useNavigate()
  
    const handleChange = (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    };
  
    const handleTags = (e) => {
      setTags(e.target.value.split(","));
    };
  
    const uploadFile = (file, urlType) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setInputs((prev) => {
              return { ...prev, [urlType]: downloadURL };
            });
          });
        }
      );
    };
  
    useEffect(() => {
      video && uploadFile(video , "videoUrl");
    }, [video]);
  
    useEffect(() => {
      img && uploadFile(img, "imgUrl");
    }, [img]);
  
    const handleUpload = async (e)=>{
      e.preventDefault();
      const res = await axios.post("/videos", {...inputs, tags})
      setOpen(false)
      res.status===200 && navigate(`/video/${res.data._id}`)
    }
  
    return (
      <Container>
        <Wrapper>
          <Close onClick={() => setOpen(false)}>X</Close>
          <Title>Upload a New Video</Title>
          <Label>Video:</Label>
          {videoPerc > 0 ? (
            "Uploading:" + videoPerc
          ) : (
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          )}
          <Input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
          <Desc
            placeholder="Description"
            name="desc"
            rows={8}
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="Separate the tags with commas."
            onChance={handleTags}
          />
          <Label>Image:</Label>
          {imgPerc > 0 ? (
            "Uploading:" + imgPerc + "%"
          ) : (
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
            />
          )}
          <Button onClick={handleUpload}>Upload</Button>
        </Wrapper>
      </Container>
    );
  };
  
  export default Upload;