import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "../../context/ThemeContext";

// Styled Components
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background-color: ${(props) => (props.$isDarkMode ? "#1e1e1e" : "#f9f9f9")};
  color: ${(props) => (props.$isDarkMode ? "#eaecee" : "#333")};
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  padding: 30px 20px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: fadeIn 0.3s ease;
`;

const ModalHeader = styled.h2`
  text-align: center;
  color: ${(props) => (props.$isDarkMode ? "#7ed6df" : "#3498db")};
  margin-bottom: 25px;
  font-size: 24px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${(props) => (props.$isDarkMode ? "#eaecee" : "#333")};
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.2);
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 15px;
  color: ${(props) => (props.$isDarkMode ? "#b2bec3" : "#555")};
`;

const InputField = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.$isDarkMode ? "#555" : "#ccc")};
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#fff")};
  color: ${(props) => (props.$isDarkMode ? "#eaecee" : "#000")};
  width: calc(100% - 24px);
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: ${(props) => (props.$isDarkMode ? "#7ed6df" : "#3498db")};
  }
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  color: ${(props) => (props.$isDarkMode ? "#e74c3c" : "#c0392b")};
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 14px 0;
  background-color: ${(props) => (props.$isDarkMode ? "#3498db" : "#04AA6D")};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 30%;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) => (props.$isDarkMode ? "#2980b9" : "#1e6e99")};
  }
`;

// Main Component
const AddPermissionModal = ({ isOpen, onClose, onSave }) => {
  const { isDarkMode } = useTheme();
  const [permissionName, setPermissionName] = useState("");
  const [error, setError] = useState("");

  const validateFields = () => {
    if (permissionName.trim().length < 4) {
      setError("Permission name must be at least 4 characters.");
      return false;
    }
    if (!/^[A-Za-z\s]+$/.test(permissionName)) {
      setError("Permission name should contain only letters and spaces.");
      return false;
    }
    setError("");
    return true;
  };

  const handleInputChange = (e) => {
    setPermissionName(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      onSave({ id: Date.now(), permission: permissionName });
      setPermissionName("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContainer $isDarkMode={isDarkMode}>
        <CloseButton $isDarkMode={isDarkMode} onClick={onClose}>
          &times;
        </CloseButton>
        <ModalHeader>Add New Permission</ModalHeader>
        <FormContainer onSubmit={handleSubmit}>
          <FormField>
            <Label $isDarkMode={isDarkMode}>Permission Name:</Label>
            <InputField
              $isDarkMode={isDarkMode}
              type="text"
              placeholder="Enter Permission Name"
              value={permissionName}
              onChange={handleInputChange}
            />
            {error && <ErrorMessage $isDarkMode={isDarkMode}>{error}</ErrorMessage>}
          </FormField>
          <Button type="submit">Add Permission</Button>
        </FormContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default AddPermissionModal;
