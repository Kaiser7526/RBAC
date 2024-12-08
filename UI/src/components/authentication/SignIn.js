import React, { useState } from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { useTheme } from "../context/ThemeContext";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Card = styled.div`
  background: ${(props) =>
    props.isDarkMode
      ? "linear-gradient(135deg, #1f1f1f, #2a2a2a)"
      : "linear-gradient(135deg, #ffffff, #f9f9f9)"};
  border-radius: 15px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
`;

const CloseIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.8rem;
  cursor: pointer;
  color: ${(props) => (props.isDarkMode ? "#aaa" : "#666")};
  &:hover {
    color: ${(props) => (props.isDarkMode ? "#fff" : "#000")};
  }
`;

const Title = styled.h2`
  color: ${(props) => (props.isDarkMode ? "#fff" : "#333")};
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const FormField = styled.div`
  margin-bottom: ${(props) => (props.error ? "0.5rem" : "1rem")};
`;

const Label = styled.label`
  display: block;
  text-align: left;
  color: ${(props) => (props.isDarkMode ? "#bbb" : "#555")};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid ${(props) => (props.error ? "red" : "#ccc")};
  border-radius: 8px;
  background: ${(props) => (props.isDarkMode ? "#333" : "#fff")};
  color: ${(props) => (props.isDarkMode ? "#fff" : "#000")};
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 6px rgba(0, 123, 255, 0.5);
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem;
  text-align: left;
  display: block;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 0.9rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  background: ${(props) =>
    props.primary ? "#007bff" : props.isDarkMode ? "#444" : "#f1f1f1"};
  color: ${(props) =>
    props.primary ? "#fff" : props.isDarkMode ? "#fff" : "#333"};
  &:hover {
    background: ${(props) =>
      props.primary ? "#0056b3" : props.isDarkMode ? "#555" : "#e1e1e1"};
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  color: ${(props) => (props.isDarkMode ? "#aaa" : "#ccc")};
`;

const Line = styled.div`
  flex: 1;
  height: 1px;
  background: ${(props) => (props.isDarkMode ? "#555" : "#ddd")};
`;

const OrText = styled.div`
  margin: 0 0.5rem;
  font-size: 0.9rem;
`;

const SignInModal = ({ show, closeSignInModal }) => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleSignIn = () => {
    let isValid = true;
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      alert("Sign In Successful!");
    }
  };

  return (
    <Overlay show={show}>
      <Card isDarkMode={isDarkMode}>
        <CloseIcon onClick={closeSignInModal}>&times;</CloseIcon>
        <Title isDarkMode={isDarkMode}>Sign In</Title>
        <FormField>
          <Label>Email</Label>
          <StyledInput
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(""); // Clear error when typing
            }}
            error={emailError}
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </FormField>
        <FormField>
          <Label>Password</Label>
          <StyledInput
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError(""); // Clear error when typing
            }}
            error={passwordError}
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </FormField>
        <StyledButton primary onClick={handleSignIn} style={{ width: "25%" }}>
          Sign In
        </StyledButton>
        <Divider>
          <Line />
          <OrText>Or</OrText>
          <Line />
        </Divider>
        <StyledButton>
          <FcGoogle size={20} style={{ marginRight: "8px" }} />
          Sign in with Google
        </StyledButton>
      </Card>
    </Overlay>
  );
};

export default SignInModal;
