import { useSelect } from "@mui/base";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components"
import IconaCanale from '../img/iconaCanale.png';
import Comment from "./Comment"

const Container = styled.div`

`
const NewComment = styled.div`
    margin-top: 25px;
    display: flex;
    gap: 10px;
    align-items: center;
`

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius:50%;
`

const Input = styled.input`
    border: none;
    border-bottom: 1px solid ${({theme})=>theme.soft};
    background-color: transparent;
    outline: none;
    padding: 5px;
    width: 100%;
`

const Comments = ({videoId}) => {

    const [comments, setComments] = useState([]);

    const {currentUser} = useSelector((state)=> state.user);
 
    //FETCH ALL COMMENTS OF A VIDEO USING HIS ID

    useEffect(()=>{
        const fetchComments = async()=>{
            console.log('Fetching all comments');
            try {
                const res = await axios.get(`/comments/${videoId}`)
                setComments(res.data);
                console.log(comments)

            } catch (error) {}
        }
        fetchComments();
    }, [videoId])


  return (
    <Container>
        <NewComment>
            <Avatar src={currentUser.imgUrl} />
            <Input placeholder="Add a comment..." />
        </NewComment>
        {
            comments.map(comment => (
                <Comment key = {comment._id} comment = {comment}/>
            ))
        }

    </Container>
  )
}

export default Comments