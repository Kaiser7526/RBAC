import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "../context/ThemeContext";
import SignInModal from "../authentication/SignIn";
import SignUpModal from "../authentication/SignUp";

// Styled Components
const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: ${(props) => (props.$isDarkMode ? "#222" : "#f4f4f4")};
  color: ${(props) => (props.$isDarkMode ? "#ddd" : "#333")};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const LogoContainer = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => (props.$isDarkMode ? "#4caf50" : "#2c3e50")};
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => (props.$isDarkMode ? "#81c784" : "#34495e")};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ToggleThemeButton = styled.button`
  background: ${(props) => (props.$isDarkMode ? "#4caf50" : "#e67e22")};
  border: none;
  color: #fff;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${(props) => (props.$isDarkMode ? "#388e3c" : "#d35400")};
  }
`;


const AuthButtons = styled.div`
  display: flex;
  gap: 15px;
`;

const AuthButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#007bff")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#fff")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.$isDarkMode ? "#444" : "#0056b3")};
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  background-color: ${(props) => (props.$isDarkMode ? "#222" : "#fff")};
  color: ${(props) => (props.$isDarkMode ? "#ddd" : "#333")};
  position: absolute;
  top: 60px;
  right: 0;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 10;

  button {
    margin-bottom: 10px;
  }
`;

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <>
      <NavbarContainer $isDarkMode={isDarkMode}>
        <LogoContainer $isDarkMode={isDarkMode}>MyApp</LogoContainer>

        <ButtonGroup>
          <ToggleThemeButton $isDarkMode={isDarkMode} onClick={toggleDarkMode}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </ToggleThemeButton>
          <AuthButtons>
            <AuthButton $isDarkMode={isDarkMode} onClick={() => setShowSignInModal(true)}>
              Sign In
            </AuthButton>
            <AuthButton $isDarkMode={isDarkMode} onClick={() => setShowSignUpModal(true)}>
              Sign Up
            </AuthButton>
          </AuthButtons>
        </ButtonGroup>

        <HamburgerIcon onClick={toggleMenu}>
        </HamburgerIcon>
      </NavbarContainer>

      <MobileMenu $isDarkMode={isDarkMode} show={showMenu}>
        <ToggleThemeButton $isDarkMode={isDarkMode} onClick={toggleDarkMode}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </ToggleThemeButton>
        <AuthButton $isDarkMode={isDarkMode} onClick={() => setShowSignInModal(true)}>
          Sign In
        </AuthButton>
        <AuthButton $isDarkMode={isDarkMode} onClick={() => setShowSignUpModal(true)}>
          Sign Up
        </AuthButton>
      </MobileMenu>

      <SignInModal show={showSignInModal} closeSignInModal={() => setShowSignInModal(false)} />
      <SignUpModal show={showSignUpModal} closeSignUpModal={() => setShowSignUpModal(false)} />
    </>
  );
}

export default Navbar;
