import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import posts from "./posts";

const Container = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  padding-top: 1rem;
`;

export default function PostsList() {
  const [postUsers, setPostUsers] = useState(undefined);
  const fetchPostUsers = async () => {
    const response = await fetch("https://randomuser.me/api/?results=15");
    const data = await response.json();
    return data.results;
  };

  const combinePostsAndUsers = (users, posts) => {
    let combinedUsers = users.map((user, i) => {
      const combined = { ...user, postData: posts[i] };
      return combined;
    });
    return combinedUsers;
  };

  useEffect(() => {
    const getPostUsers = async () => {
      let newUsers = await fetchPostUsers();
      newUsers = combinePostsAndUsers(newUsers, posts);
      setPostUsers(newUsers);
    };
    getPostUsers();
  }, []);

  return (
    <Container>
      <ul>
        {postUsers &&
          postUsers.map((user) => {
            return <Post key={user.login.uuid} user={user} />;
          })}
      </ul>
    </Container>
  );
}

const StyledPost = styled.li`
  background-color: white;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  box-shadow: 5px 5px 2rem #e9e9e9;
`;

const StyledPostUser = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StyledUserImage = styled.img`
  border-radius: 50%;
`;

const StyledUserName = styled(Link)`
  display: block;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
`;
const StyledPostTime = styled.div`
  color: rgb(84, 175, 179);
`;

const StyledPostContent = styled.p`
  line-height: 1.5rem;
  letter-spacing: 0.5px;
  font-weight: 30;
  color: black;
  margin-bottom: 1rem;
`;

const StyledCommentInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 0.7rem 0.5rem;
  border: none;
  border-radius: 0.2rem;
  background-color: rgb(228, 254, 255);
  font-size: 1rem;
`;

const StyledSendIcon = styled(SendIcon)`
  position: absolute;
  top: 20%;
  right: 0.5rem;
  color: rgb(84, 175, 179);
`;
function Post({ user }) {
  const name = Object.values(user.name).slice(1).join(" ");

  return (
    <StyledPost>
      <StyledPostUser>
        <StyledUserImage src={user.picture.medium} alt="" />
        <div className="user-info">
          <StyledUserName to={`/profile/${name}`} state={{ user: user }}>
            {name}
          </StyledUserName>
          <StyledPostTime className="post-time">Just Now</StyledPostTime>
        </div>
      </StyledPostUser>
      <StyledPostContent className="post-content">
        {user.postData}
      </StyledPostContent>
      <form style={{ position: "relative" }} action="">
        <StyledCommentInput type="text" placeholder="Enter you comment" />
        <StyledSendIcon />
      </form>
    </StyledPost>
  );
}
