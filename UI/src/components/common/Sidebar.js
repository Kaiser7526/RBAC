import React from "react";
import styled from "styled-components";
import { FaUsers, FaUserCog, FaUserLock } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

// Styled Components
const SidebarWrapper = styled.div`
  height: 100vh;
  width: 180px;
  background-color: ${(props) => (props.$isDarkMode ? "#2c3e50" : "#ecf0f1")};
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  transition: all 0.3s ease;
  margin-top: 65px;
`;

const ThemeIndicator = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  padding: 10px 0;
  font-weight: bold;
  font-size: 14px;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#333")};
  background-color: ${(props) => (props.$isDarkMode ? "#34495e" : "#bdc3c7")};
  border-radius: 5px;
  transition: all 0.3s ease;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${(props) => (props.$isDarkMode ? "#34495e" : "#f5f5f5")};
    transform: translateX(10px);
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (props.$isDarkMode ? "#ecf0f1" : "#2c3e50")};
  transition: color 0.3s ease;

  &.active {
    color: ${(props) => (props.$isDarkMode ? "#e74c3c" : "#2980b9")};
    border-left: 5px solid ${(props) => (props.$isDarkMode ? "#e74c3c" : "#2980b9")};
    padding-left: 15px;
  }
`;

const IconContainer = styled.div`
  margin-right: 10px;
  font-size: 18px;
  color: ${(props) => (props.$isDarkMode ? "#e74c3c" : "#2980b9")};
`;

const Sidebar = () => {
  const { isDarkMode } = useTheme();

  return (
    <SidebarWrapper $isDarkMode={isDarkMode}>
      {/* Theme Indicator */}
      <ThemeIndicator $isDarkMode={isDarkMode}>
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </ThemeIndicator>

      {/* Menu */}
      <Menu>
        <MenuItem $isDarkMode={isDarkMode}>
          <StyledNavLink exact to="/" activeClassName="active" $isDarkMode={isDarkMode}>
            <IconContainer $isDarkMode={isDarkMode}>
              <MdDashboard />
            </IconContainer>
            Dashboard
          </StyledNavLink>
        </MenuItem>
        <MenuItem $isDarkMode={isDarkMode}>
          <StyledNavLink to="/manageuser" activeClassName="active" $isDarkMode={isDarkMode}>
            <IconContainer $isDarkMode={isDarkMode}>
              <FaUsers />
            </IconContainer>
            Users
          </StyledNavLink>
        </MenuItem>
        <MenuItem $isDarkMode={isDarkMode}>
          <StyledNavLink to="/managerole" activeClassName="active" $isDarkMode={isDarkMode}>
            <IconContainer $isDarkMode={isDarkMode}>
              <FaUserCog />
            </IconContainer>
            Roles
          </StyledNavLink>
        </MenuItem>
        <MenuItem $isDarkMode={isDarkMode}>
          <StyledNavLink to="/managepermission" activeClassName="active" $isDarkMode={isDarkMode}>
            <IconContainer $isDarkMode={isDarkMode}>
              <FaUserLock />
            </IconContainer>
            Permissions
          </StyledNavLink>
        </MenuItem>
      </Menu>
    </SidebarWrapper>
  );
};

export default Sidebar;
