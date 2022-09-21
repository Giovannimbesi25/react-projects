import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components'
import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import {auth, provider} from "../firebase"
import {signInWithPopup} from "firebase/auth"
import { async } from '@firebase/util';
import { useNavigate } from 'react-router-dom';

const Container=styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`

const Wrapper=styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  padding: 20px 50px;
  gap: 10px;
  margin-bottom: 5%;
`

const Title = styled.h1`
  font-size: 24px;

`


const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 400;

`



const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding:10px;
  background-color: transparent;
  width: 100%;
`



const Button = styled.button`
  border-radius: 5px;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color:  ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  border: 1px solid ${({ theme }) => theme.text};
`
const More = styled.div`
  
  margin-top: 20px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
  display: flex;
`


const Links = styled.div`
  margin-left: 50px;  
  cursor: pointer;
`

const Link = styled.span`
  margin-left: 30px;

`


const SignIn = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    //Se clicco il bottone non fa il refresh
    e.preventDefault();
    
    dispatch(loginStart());
    //If fetching is successful 
    try {
      const res = await axios.post("/auth/signin", {name, password});
      //Pass the user
      dispatch(loginSuccess(res.data))
      navigate("/");

    } catch (error) {
        dispatch(loginFailure());
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res)
            dispatch(loginSuccess(res.data));
            navigate("/")
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
};

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>to continue to GioTube</SubTitle>
        <Input placeholder="username"  onChange={e=>setName(e.target.value)} />
        <Input placeholder="password" type="password" onChange={e=>setPassword(e.target.value)}/>
        <Button onClick={handleLogin}  >Sign In</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Title>or</Title>

        <Input placeholder="username" onChange={e=>setName(e.target.value)}/>
        <Input placeholder="email" onChange={e=>setEmail(e.target.value)}/>
        <Input placeholder="password" type="password" onChange={e=>setPassword(e.target.value)}/>
        <Button>Sign Up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  )
}

export default SignIn