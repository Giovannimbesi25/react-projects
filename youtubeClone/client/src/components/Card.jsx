import { Link } from 'react-router-dom';
import styled from 'styled-components';
import IconaCanale from '../img/iconaCanale.png';
import {format} from "timeago.js";
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Container = styled.div`
width: ${(props) => props.type !== "sm" && "360px"};
margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
cursor: pointer;
display: ${(props) => props.type === "sm" && "flex"};
gap: 10px;
`

const Image = styled.img`
  height: ${(props)=>props.type === "sm" ? "120px": "202px"};
  width: 100%;
  background-color: #999;
  flex:1;
`
const Details = styled.div` 
  display: flex;
  margin-top: ${(props)=>props.type !== "sm" && "16px"};
  gap: 12px;
  width: 100%;
  flex: 1;
`



const ChannelImage= styled.img`
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props)=>props.type === "sm" && "none"};

`



const Texts = styled.div`
`

const Title = styled.h1`
  font-size: 15px;
  font-weight: 500;
  color: ${({theme})=> theme.textSoft};

`

const Nomecanale = styled.h2 `
font-size: 14px;
margin: 9px 0px;
color: ${({theme})=> theme.textSoft};

`

const Info = styled.div`
  font-size: 14px;
  color: ${({theme})=> theme.textSoft};
`

const Card = ({type, video}) => {

  //Per ogni card estraiamo le informazioni sul canale che ha
  //caricato il video

  const [channel, setChannel] = useState([]);
  
  useEffect(()=>{
    const fetchChannel = async () =>{
      const res = await axios.get(`/users/find/${video.userId}`);
      setChannel(res.data)
    }
    fetchChannel();

  }, [video.userId])


  return (
    <Link to={`/video/${video._id}`} style={{textDecoration: 'none'}}>
      <Container type={type} >
          <Image type={type} src={video.imgUrl}/>
          <Details type={type} >
              <ChannelImage type={type} src={channel.img}/>
              <Texts>
                <Title>{video.title}</Title>
                <Nomecanale>{channel.name}</Nomecanale>
                <Info>{video.views} views · {format(video.createdAt)} </Info>
              </Texts>
          </Details>
      </Container>
    </Link>
  )
}

export default Card