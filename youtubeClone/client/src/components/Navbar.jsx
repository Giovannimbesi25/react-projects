import styled from 'styled-components';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { useState } from 'react';
import Upload from './Upload';



const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({theme})=> theme.bgLighter};
  height: 50px;
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
  justify-content: flex-end;
  position: relative;
`
const Search = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    width: 50%;
    gap: 5%;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    color: ${({theme})=> theme.text};
`
const Input = styled.input`
    flex: 7;
    border: none;
    background-color: transparent;
    text-decoration: none;
    outline: none;
    color: ${({theme})=> theme.text};
`
const SearchIconDiv = styled.div`
  
  color: ${({theme})=> theme.text};
   `

const Button = styled.button`
  padding : 7.5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  
`

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({theme})=> theme.text};
  cursor: pointer;

`

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`


const Navbar = () => {

  const [open, setOpen] = useState(false);

  const currentUser = useSelector(state=>state.user.currentUser);

  const [q, setQ] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search" onChange={(e)=>setQ(e.target.value)}
            />
            <SearchIcon  onClick={()=>navigate(`/search?q=${q}`) }  />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
              <Avatar src={currentUser.img} />
              {currentUser.name}
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountBoxIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar