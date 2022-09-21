import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import { ThumbDownOffAltOutlined } from "@mui/icons-material";
import IconaCanale from '../img/iconaCanale.png';
import Comments from "../components/Comments";
import Card from "../components/Card"
import {useSelector, useDispatch} from 'react-redux'
import { useLocation } from "react-router-dom";
import axios from "axios";
import { fetchSuccess, fetchFailure, fetchStart, like, dislike } from "../redux/videoSlice";
import { format } from "timeago.js";
import React, { useEffect, useState } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";


const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div`
  
`

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400px;
  margin-top: 10px;
  color: ${({theme})=>theme.text};
`

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Info = styled.span`
color: ${({theme})=>theme.textSoft};

`

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({theme})=>theme.text};
`

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({theme})=>theme.soft};`



const Channel = styled.div`
  display: flex;
  justify-content: space-between;

`

const ChannelInfo = styled.div`
  display: flex;
  gap:20px;

`
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius:50%;
`
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({theme})=>theme.text};
`

const ChannelName = styled.span`
  font-weight: 500;
`

const ChannelCounter = styled.span`
margin-bottom: 15px;
color: ${({theme})=>theme.textSoft};
margin-top: 5px;
font-size: 12px;
`

const ChannelDescriptio = styled.p`

`

const SubscribeBTN = styled.button`
  background-color: #cc1a00;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  font-weight: bold;
  color: white;
`

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
  border: 1px solid ${({theme})=> theme.textLighter};
  border-radius: 5px;

`



const Video = () => {

  const [full, setFull] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    console.log("STO ESEGUENDO")
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]);


  const handleLike = async () => {
    await axios.put(`/users/like/${currentVideo._id}`)
    dispatch(like(currentUser._id))
  }

  const handleDislike = async() => {
    await axios.put(`/users/dislike/${currentVideo._id}`)
    dispatch(dislike(currentUser._id))

  }

  const handleSub = async () =>{
    currentUser.subscribedUsers.includes(channel._id) ? 
        await axios.put(`/users/unsub/${channel._id}`) 
      :
        await axios.put(`/users/sub/${channel._id}`) 

    dispatch(subscription(channel._id))
  }

  return ( currentVideo!= undefined &&
    <Container>
        <Content>
        <VideoWrapper>
          <VideoFrame autoPlay={true} src={currentVideo.videoUrl} controls >
          </VideoFrame>
        </VideoWrapper>
        <Title>{currentVideo.title} </Title>
        <Details>
          <Info>{currentVideo.views} views · {format(currentVideo.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {
                currentVideo.likes?.includes(currentUser._id) ? 
                (
                  <ThumbUpIcon/>
                )
                :
                (
                  <ThumbUpOutlinedIcon/>
                  
                )
              }{" "}
              {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </Button>
            <Button><ReplyOutlinedIcon/>Share</Button>
            <Button><AddTaskOutlinedIcon/>Save</Button>

          </Buttons>
        </Details>
        <Hr/>
        <Channel>
          <ChannelInfo>
            <Image src={channel.img}/>
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers}</ChannelCounter>
              <ChannelDescriptio>{currentVideo.desc}</ChannelDescriptio>
            </ChannelDetail>
            
          </ChannelInfo>
          <SubscribeBTN onClick={handleSub}>
            {currentUser.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED"
            : "SUBSCRIBE"}
          </SubscribeBTN>
        </Channel>
        <Hr/>
          <Comments videoId= {currentVideo._id}/>
        </Content>
        <Recommendation tags={currentVideo.tags}>
          
        </Recommendation>
    </Container>
  )
}

export default Video