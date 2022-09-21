import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import axios from "axios";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

`

const Home = ({type}) => {

  const [videos, setVideos] = useState([]);

  //USE EFFETC CREA UNA FUNZIONE CHE VIENE ESEGUITA OGNI VOLTA CHE 
  //SI VERIFICA UN CERTO EVENTO SPECIFICATO NELLE PARENTESI []
  //SE VUOTE, SI VERIFICA SOLO ALL'AVVIO
  useEffect(()=>{
    const fetchVideos = async () =>{
      const res = await axios.get(`/videos/${type}`);
      setVideos(res.data)
    }
    fetchVideos();

  }, [type])

  return (
    <Container>
        { videos.length > 0 ? (
            videos.map((video) => (
              //The video attribute is passed as prompt in the card component
              //In this way we can extract its data
              <Card  key={video._id} video = {video} />
            ))
          ) : "No Video Found!"
        }

    </Container>
  )
}

export default Home