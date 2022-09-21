import styled from "styled-components";
import IconaCanale from '../img/iconaCanale.png';


const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 40px 0;
`


const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius:50%;
`


const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Name = styled.span`
  font-size: 13px;
  font-weight: bold;
  color: ${({theme})=>theme.text};
`

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({theme})=>theme.textSoft};
  margin-left: 5px; 
`

const Text = styled.span`
  color: ${({theme})=>theme.text};
  font-size: 15px;
`

const Comment = ({comment}) => {

  console.log(comment)
  
  return (
    <Container>
      <Avatar src={IconaCanale} />
      <Details>
        <Name>Giovanni<Date>1 day ago</Date> </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  )
}

export default Comment