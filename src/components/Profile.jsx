import React from "react";
import { useLocation } from "react-router";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  max-width: 650px;
  margin: 0 auto;
  padding-top: 1rem;
  background-color: white;
`;
const TopSpace = styled.div`
  height: 15rem;
  background-image: linear-gradient(
    to right,
    rgba(161, 226, 229, 0.315),
    rgba(214, 124, 143, 0.26)
  );
`;

const ProfilePicture = styled.img`
  display: block;
  width: 200px;
  margin: 0 auto;
  margin-top: -5rem;
  margin-bottom: 1rem;
  border-radius: 50%;
  border: 0.5rem solid white;
`;

const ProfileDetails = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  .info-type {
    display: inline-block;
    width: 50%;
    @media (max-width: 700px) {
      width: 30%;
    }
    color: rgb(84, 175, 179);
  }
`;

const InfoItem = styled.li`
  margin: 1.5rem 0;
`;
function Profile() {
  const location = useLocation();
  const user = location.state.user;
  const name = Object.values(user.name).slice(1).join(" ");
  const dob = new Date(user.dob.date);
  const birthDay = dob.toDateString().slice(0, -4);
  const birthYear = dob.getFullYear();
  return (
    <Container>
      <TopSpace />
      <ProfilePicture src={user.picture.large} alt="" />
      <ProfileDetails>
        <h1
          style={{
            margin: "0 auto",
            width: "fit-content",
            marginBottom: "2rem",
          }}
        >
          {name}
        </h1>
        <h2>Contact Information</h2>
        <ul>
          <InfoItem>
            <span className="info-type">Email</span>
            <span>{user.email}</span>
          </InfoItem>
          <InfoItem>
            <span className="info-type">Phone</span>
            <span>{user.cell}</span>
          </InfoItem>
          <InfoItem>
            <span className="info-type">Address</span>
            <span>{`${user.location.country}, ${user.location.city}`}</span>
          </InfoItem>
        </ul>
        <h2>Basic Information</h2>
        <ul>
          <InfoItem>
            <span className="info-type">Birthday</span>
            <span>{birthDay}</span>
          </InfoItem>
          <InfoItem>
            <span className="info-type">Birth Year</span>
            <span>{birthYear}</span>
          </InfoItem>
          <InfoItem>
            <span className="info-type">Gender</span>
            <span>{user.gender}</span>
          </InfoItem>
        </ul>
      </ProfileDetails>
    </Container>
  );
}

export default Profile;
