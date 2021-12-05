import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logoImage from "../logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import profileNavItems from "./headerData";
import MenuIcon from "@mui/icons-material/Menu";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  z-index: 100;
  background-color: white;
  align-items: center;
  gap: 3rem;
  padding: 1rem 2rem;
  box-shadow: 0 1px 1rem #e9e9e9;
  @media (max-width: 680px) {
    gap: 0.5rem;
    padding: 1rem 1rem;
  }
`;

const SideMenuButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  display: none;
  @media (max-width: 680px) {
    display: block;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  h1 {
    margin-left: 0.5rem;
    font-weight: normal;
  }
  @media (max-width: 400px) {
    img {
      width: 50px;
    }
    h1 {
      font-size: 1.7rem;
    }
  }
`;

const SearchInput = styled.form`
  input {
    padding: 0.5rem;
    width: 17rem;
    border: none;
    border-radius: 0.2rem;
    background-color: rgb(228, 254, 255);
    font-size: 1rem;
  }
  @media (max-width: 1100px) {
    display: none;
  }
`;

const SearchInputIcon = styled(SearchIcon)`
  position: absolute;
  color: rgb(84, 175, 179);
  top: 15%;
  right: 0.5rem;
`;

const ProfileNav = styled.div`
  margin-left: auto;
  display: flex;
  gap: 1rem;
  ul {
    display: flex;
    justify-content: end;
    gap: 1.5rem;
  }
  @media (max-width: 700px) {
    ul {
      box-sizing: border-box;
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      justify-content: center;
      padding: 0.5rem;
      gap: 2rem;
      background-color: white;
      box-shadow: 0 -1px 1rem #e9e9e9;
    }
  }
`;

export default function Header({ sideNavState }) {
  const [, setShowSideNav] = sideNavState;
  return (
    <StyledHeader>
      <SideMenuButton
        onClick={() => setShowSideNav((showSideNav) => !showSideNav)}
      >
        <MenuIcon />
      </SideMenuButton>
      <Logo to="/">
        <img src={logoImage} alt="" />
        <h1>Connect</h1>
      </Logo>

      <SearchInput style={{ position: "relative" }} action="">
        <input placeholder="Search here..." type="text" />
        <SearchInputIcon />
      </SearchInput>

      <ProfileNav className="profile-nav">
        <ul>
          {profileNavItems.map((item, i) => {
            return <ProfileNavItem key={i} name={item.name} Icon={item.icon} />;
          })}
        </ul>
        <MyProfileItem />
      </ProfileNav>
    </StyledHeader>
  );
}

const StyledProfileNavItem = styled.li`
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    svg {
      background-image: linear-gradient(
        to right,
        rgba(161, 226, 229, 0.315),
        rgba(214, 124, 143, 0.26)
      );
      padding: 0.3rem;
      border-radius: 0.5rem;
      margin-bottom: 0.2rem;
    }
  }
`;

function ProfileNavItem({ Icon, name }) {
  return (
    <StyledProfileNavItem>
      <Link to="/" className="profile-nav-item">
        <Icon />
        <span
          className="item-name"
          style={{ fontSize: ".8rem", fontWeight: "bold" }}
        >
          {name}
        </span>
      </Link>
    </StyledProfileNavItem>
  );
}

const ActiveUserImage = styled.img`
  width: 2.5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const ActiveUser = styled(Link)`
  display: flex;
  align-items: center;
`;

function MyProfileItem() {
  const [user, setUser] = useState(undefined);
  const fetchUser = async () => {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    return data.results[0];
  };
  useEffect(() => {
    const getUser = async () => {
      const newUser = await fetchUser();
      setUser(newUser);
    };
    getUser();
  }, []);

  const name = user ? Object.values(user.name)[1] : "";
  return (
    <>
      {user && (
        <ActiveUser to={`/profile/${name}`} state={{ user: user }}>
          <ActiveUserImage src={user.picture.thumbnail} alt="" />
          <span className="name">{name}</span>
        </ActiveUser>
      )}
    </>
  );
}
