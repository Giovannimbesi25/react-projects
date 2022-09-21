import React from 'react'
import styled from 'styled-components';
import icona from '../img/logo.png';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MovieIcon from '@mui/icons-material/Movie';
import ArticleIcon from '@mui/icons-material/Article';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SettingsIcon from '@mui/icons-material/Settings';
import FlagIcon from '@mui/icons-material/Flag';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess, logout } from '../redux/userSlice';
import LogoutIcon from '@mui/icons-material/Logout';

const Container = styled.div`
  min-width: 170px;
  flex: 0.9;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  height: 100vh;
  font-size: 13px;
  position: sticky;
  top: 0;
  overflow-y: auto;

`   
const Wrapper = styled.div`
    padding: 18px 26px;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
  font-size: 15px;

`;

const Img = styled.img`
    height: 30px;
`

const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    padding: 7.5px 0px;

    &:hover{
        background-color: ${({theme}) => theme.highlight};
    }

`   
const Hr = styled.hr`
    margin: 15px;
    border: 0.5px solid ${({theme})=> theme.soft};
`

const Login = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    text-align: center;
`
const Button = styled.button`
    padding : 7.5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
`

const Title = styled.h2`
    font-size: 15px;
    font-weight: bold;
    color: darkgoldenrod;
    margin-bottom: 10px;
    text-align: center;
`

const Menu = ({darkMode,setDarkMode}) => {

    const currentUser = useSelector(state=>state.user.currentUser);


    const navigate = useNavigate();
    const dispatch = useDispatch();



  return (
    <Container>
        <Wrapper>
            <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>

                <Logo>
                    <Img src={icona} alt="logoNotFound" />
                    <span>GioTube</span>
                </Logo>
                </Link>
                <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
                <Item>
                    <HomeIcon />
                    Home
                </Item>
                </Link>
                <Link to="trends" style={{textDecoration: 'none', color: 'inherit'}}>
                    <Item>
                        <ExploreIcon />
                        Explore
                    </Item>
                </Link>
                <Link to="subscriptions" style={{textDecoration: 'none', color: 'inherit'}}>
                    <Item>
                        <SubscriptionsIcon />
                        Subscription
                    </Item>
                </Link>
                <Hr/>
                <Item>
                    <VideoLibraryIcon />
                    VideoLibrary
                </Item>
                <Item>
                    <HistoryIcon />
                    History
                </Item>
                <Hr/>
                { !currentUser ? (
                    <>
                    <Login>
                        Sign in to like videos, comment, and subscribe.
                        <Link to="signin"  style={{textDecoration: 'none'}}>
                        <Button>
                            <AccountBoxIcon />
                            SIGN IN</Button>
                        </Link>
                    </Login>
                    <Hr/>
                    </> 
                    ) : 
                    (
                        <>
                        <Login>        
                            <Button onClick={()=>{
                                if (window.confirm("Do You Want To Leave?") === true )
                                    dispatch(logout());
                                    navigate("/");
                                
                            }}>
                                <LogoutIcon />
                                Logout</Button>
                            
                        </Login>
                        <Hr/>
                        </> 
                    )
                    
                }
                
                <Title>BEST OF GIOTUBE</Title>
                <Item>
                    <LibraryMusicIcon />
                    MusicLibrary
                </Item>
                <Item>
                    <SportsBasketballIcon />
                    Sports
                </Item>
                <Item>
                    <SportsEsportsIcon />
                    Gaming
                </Item>
                <Item>
                    <MovieIcon />
                    Movies
                </Item>
                <Item>
                    <ArticleIcon />
                    News
                </Item>
                <Item>
                    <LiveTvIcon />
                    Live
                </Item>
                <Hr/>
                <Item>
                    <SettingsIcon />
                    Settings
                </Item>
                <Item>
                    <FlagIcon />
                    Report
                </Item>
                <Item>
                    <HelpCenterIcon />
                    Help
                </Item>
                <Item onClick={()=>setDarkMode(!darkMode)}>
                    <SettingsBrightnessIcon />
                    { darkMode ? "Light" : "Dark"
                    } Mode
                </Item>
            

        </Wrapper>
        
    </Container>
  )
}

export default Menu