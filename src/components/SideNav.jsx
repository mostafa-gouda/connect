import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import items from "./sideNavData";

const Nav = styled.nav`
  z-index: 1;
  position: fixed;
  padding: 1rem 1rem;
  background-color: white;
  height: 100%;
  @media (max-width: 680px) {
    transition: all 0.1s linear;
    transform: translateX(${(props) => (props.showSideNav ? "0" : "-100%")});
  }
`;

function SideNav({ sideNavState }) {
  const [showSideNav, setShowSideNav] = sideNavState;
  return (
    <Nav showSideNav={showSideNav} setShowSideNav={setShowSideNav}>
      <ul>
        {items.map((item, i) => {
          return <SideNavItem key={i} Icon={item.icon} name={item.name} />;
        })}
      </ul>
    </Nav>
  );
}

const StyledSideNavItem = styled.li`
  background-color: rgb(240, 253, 255);
  padding: 1rem;
  border-radius: 0.3rem;
  margin-bottom: 1rem;

  a {
    display: flex;
    align-items: center;
    gap: 1rem;

    .item-name {
      padding-right: 3rem;
      @media (max-width: 1200px) {
        display: none;
      }
      @media (max-width: 680px) {
        display: block;
      }
    }
  }
  svg {
    /* Icon */
    color: rgb(84, 175, 179);
  }
`;

function SideNavItem({ Icon, name }) {
  return (
    <StyledSideNavItem>
      <Link to="/">
        <Icon />
        <span className="item-name" style={{ fontWeight: "bold" }}>
          {name}
        </span>
      </Link>
    </StyledSideNavItem>
  );
}

export default SideNav;
