import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { MdOutlineDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

//Importing ThemeContext
import { useTheme } from "../../context/ThemeContext";

//Importing components
import Sidebar from "../../common/Sidebar";
import AddRoleModal from "../manageroles/AddRole";
import SmallscreenSidebar from "../../common/SmallscreenSidebar";


// Styled Components
const ManageRolesContainer = styled.div`
  display: flex;
  height: 80vh;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarContainer = styled.div`
  width: 14vw;
  height: 100%;
`;

const MainContent = styled.div`
  width: 86vw;
  height: 100%;
  padding: 20px;
  background-color: ${(props) => (props.$isDarkMode ? "#1a1a1a" : "#f9f9f9")};
  font-family: "Arial", sans-serif;
  color: ${(props) => (props.$isDarkMode ? "#eaecee" : "#555")};
`;

const Header = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 0px;
  color: ${(props) => (props.$isDarkMode ? "#eaecee" : "#555")};
`;

const Separator = styled.hr`
  border: none;
  height: 2px;
  background-color: #808b96;
  margin-bottom: 1.5rem;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SectionHeading = styled.h2`
  font-size: 20px;
  margin: 0;
  color: ${(props) => (props.$isDarkMode ? "#eaecee" : "#555")};
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1.5px solid ${(props) => (props.$isDarkMode ? "#eaecee" : "#ddd")};
  border-radius: 5px;
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#fff")};
  padding: 5px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  input {
    border: none;
    outline: none;
    color: ${(props) => (props.$isDarkMode ? "#eaecee" : "#555")};
    background-color: ${(props) => (props.$isDarkMode ? "#333" : "#fff")};
    font-size: 16px;
    margin-left: 10px;
    flex: 1;
  }
`;

const TableContainer = styled.div`
  margin-top: 20px;
  padding-bottom: 10px;
  background-color: ${(props) => (props.$isDarkMode ? "#444" : "#fff")};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const TableHead = styled.thead`
   background-color: ${(props) => (props.$isDarkMode ? "#333" : "#fff")};
  color: #f7f7f7;
  border-radius: 8px;

  th {
    padding: 15px 10px;
    text-align: left;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
    background-color: #444;
    border-bottom: 2px solid #ff5722;
  }
`;

const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: ${(props) => (props.$isDarkMode ? "#555" : "#f9f9f9")};
  }

  td {
    padding: 10px 10px;
    color: ${(props) => (props.$isDarkMode ? "#eaecee" : "#555")};
  }
`;

const UsernameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

const DeleteButton = styled.button`
  margin-top: 3px;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#fff")};
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;

const DeleteIcon = styled(MdOutlineDelete)`
  font-size: 17px;
  color: ${(props) => (props.$isDarkMode ? "#eaecee" : "#555")};
`;

const ActionIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  font-size: 14px;
  color: ${(props) => (props.$isDarkMode ? "#eaecee" : "#555")};
`;

const AddNewRoleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 5px solid black;
  background-color: black;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 5px 10px;
`;

const ErrorMessage = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #dc3545;
  background-color: #f8d7da;
  border-radius: 5px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 12px 18px;
  background: ${(props) => (props.disabled ? "#ccc" : "linear-gradient(90deg, #6a11cb, #2575fc)")};
  color: ${(props) => (props.disabled ? "#888" : "#fff")};
  border: 1px solid ${(props) => (props.disabled ? "#bbb" : "#2575fc")};
  border-radius: 50px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: ${(props) => (props.disabled ? "none" : "0 4px 6px rgba(0, 0, 0, 0.1)")};

  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "linear-gradient(90deg, #5a0db2, #1e63d3)")};
    transform: ${(props) => (props.disabled ? "none" : "scale(1.1)")};
  }
`;

// Styled components specific to small screens

const SmallScreenContainer = styled.div`
  @media (max-width: 768px) {
    min-height: 77.5vh;
    display: block;
    padding: 20px;
    color: ${(props) => (props.$isDarkMode ? "#eaecee" : "#555")};
    background-color: ${(props) => (props.$isDarkMode ? "#1a1a1a" : "#f9f9f9")};
  }
  display: none;
`;

const Container = styled.div`
  color: ${(props) => (props.$isDarkMode ? "#eaecee" : "#555")};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0;
`;

const UserCard = styled.div`
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#fff")};
  border-radius: 12px;
  padding: 15px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`;

const UserMeta = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: ${(props) => (props.$isDarkMode ? "#eaecee" : "#555")};
`;

const MetaData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 5px;
  color: ${(props) => (props.$isDarkMode ? "#eaecee" : "#555")};
`;

const SmallScreenCardContainer = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 15px;
`;

const CardUsername = styled.h3`
  font-size: 18px;
  margin: 0;
  font-weight: 600;
  color: ${(props) => (props.$isDarkMode ? "#eaecee" : "#555")};
`;

const CardEmail = styled.p`
  font-size: 14px;
  margin: 0;
  color: ${(props) => (props.$isDarkMode ? "#eaecee" : "#555")};
`;

const CardLowerWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: ${(props) => (props.className === "active" ? "#28a745" : "#dc3545")};
`;


const ManageRoles = () => {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "Aarav Sharma",
      email: "aravsharma@example.com",
      role: "Admin",
    },
    {
      id: 2,
      username: "Diya Verma",
      email: "diyaverma@example.com",
      role: "User",
    },
    {
      id: 3,
      username: "Ishaan Kumar",
      email: "ishaankumar@example.com",
      role: "User",
    },
    {
      id: 4,
      username: "Rohan Patel",
      email: "rohanpatel@example.com",
      role: "Moderator",
    },
    {
      id: 5,
      username: "Rishi Singh",
      email: "rishi@example.com",
      role: "Admin",
    },
    {
      id: 6,
      username: "Vishal Singh",
      email: "vishal.singh@example.com",
      role: "Moderator",
    },
    {
      id: 7,
      username: "Anant Rao",
      email: "anantrao@example.com",
      role: "Manager"
    },
    {
      id: 8,
      username: "Sanya Mehta",
      email: "sanyamehta@example.com",
      role: "Admin"
    },
    {
      id: 9,
      username: "Priya Nair",
      email: "priyanair@example.com",
      role: "User"
    },
    {
      id: 10,
      username: "Kabir Joshi",
      email: "kabirjoshi@example.com",
      role: "Admin"
    },
  ]);

  const [roles, setRoles] = useState([
    { id: 1, roleName: "Admin" },
    { id: 2, roleName: "User" },
    { id: 3, roleName: "Moderator" },
  ]);

  const [modalState, setModalState] = useState({
    isOpen: false,
    isEditMode: false,
    userToEdit: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, users]
  );

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const handleAddRole = (newRole) => {
    setRoles((prevRoles) => [...prevRoles, newRole]);
    setModalState({ isOpen: false, isEditMode: false, userToEdit: null });
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <>
      <ManageRolesContainer>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <MainContent $isDarkMode={isDarkMode}>
          <Header>Manage Roles</Header>
          <Separator />
          <TopBar>
            <SectionHeading>Users & Roles List</SectionHeading>
            <TopBarRight>
              <SearchContainer $isDarkMode={isDarkMode}>
                <IoSearchOutline />
                <input
                  type="text"
                  placeholder="Search User..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </SearchContainer>
              <button
                onClick={() =>
                  setModalState({ isOpen: true, isEditMode: false })
                }
                style={{
                  backgroundColor: isDarkMode ? "black" : "white",
                  color: "white" ,
                  padding: "6px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  border: "none"
                }}
              >
                <AddNewRoleWrapper>
                  <IoMdAdd style={{ fontSize: "16px", marginRight: "6px" }} />
                  Add New Role
                </AddNewRoleWrapper>
              </button>
            </TopBarRight>
          </TopBar>

          {filteredUsers.length === 0 && searchQuery !== "" ? (
            <ErrorMessage>No users found matching "{searchQuery}"</ErrorMessage>
          ) : (
            <TableContainer $isDarkMode={isDarkMode}>
              <Table>
                <TableHead>
                  <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </TableHead>
                <TableBody $isDarkMode={isDarkMode}>
                  {currentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>
                        <UsernameWrapper>
                          {user.username}
                        </UsernameWrapper>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(user.id, e.target.value)
                          }
                        >
                          {roles.map((role) => (
                            <option key={role.id} value={role.roleName}>
                              {role.roleName}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <DeleteButton onClick={() => handleDeleteUser(user.id)}>
                          <ActionIcon>
                            {" "}
                            <DeleteIcon />
                          </ActionIcon>
                        </DeleteButton>
                      </td>
                    </tr>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <PaginationWrapper>
            {Array.from({ length: totalPages }, (_, index) => (
              <PageButton
                key={index}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PageButton>
            ))}
          </PaginationWrapper>

          {modalState.isOpen && !modalState.isEditMode && (
            <AddRoleModal
              isOpen={modalState.isOpen}
              onClose={() => setModalState({ ...modalState, isOpen: false })}
              onSave={handleAddRole}
            />
          )}
        </MainContent>
      </ManageRolesContainer>

      {/* SmallScreen Layout */}

      <SmallScreenContainer $isDarkMode={isDarkMode}>
        <SmallScreenCardContainer $isDarkMode={isDarkMode}>
          <Container $isDarkMode={isDarkMode}>
            <h1>Manage Roles</h1>
            <SmallscreenSidebar />
          </Container>

          <SectionHeading $isDarkMode={isDarkMode}>User List</SectionHeading>
          <SearchContainer $isDarkMode={isDarkMode}>
            <IoSearchOutline />
            <input
              type="text"
              placeholder="Search User..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer>
          <button
            onClick={() => setModalState({ isOpen: true, isEditMode: false })}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "6px 12px",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "1rem",
            }}
          >
            <AddNewRoleWrapper>
              <IoMdAdd style={{ fontSize: "16px", marginRight: "6px" }} />
              Add New Role
            </AddNewRoleWrapper>
          </button>
          {filteredUsers.map((user) => (
            <UserCard key={user.id} $isDarkMode={isDarkMode}>
              <UserMeta $isDarkMode={isDarkMode}>
                <MetaData>
                  <CardUsername $isDarkMode={isDarkMode}>
                    {user.username}
                  </CardUsername>
                  <CardEmail $isDarkMode={isDarkMode}>{user.email}</CardEmail>
                </MetaData>
              </UserMeta>
              <CardContent>
                <CardLowerWrap>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.roleName}>
                        {role.roleName}
                      </option>
                    ))}
                  </select>

                  <DeleteButton onClick={() => handleDeleteUser(user.id)}>
                    <ActionIcon>
                      <DeleteIcon />
                      Delete
                    </ActionIcon>
                  </DeleteButton>
                </CardLowerWrap>
              </CardContent>
            </UserCard>
          ))}
          <PaginationWrapper>
            {Array.from({ length: totalPages }, (_, index) => (
              <PageButton
                key={index}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PageButton>
            ))}
          </PaginationWrapper>

          {modalState.isOpen && !modalState.isEditMode && (
            <AddRoleModal
              isOpen={modalState.isOpen}
              onClose={() => setModalState({ ...modalState, isOpen: false })}
              onSave={handleAddRole}
            />
          )}
        </SmallScreenCardContainer>
      </SmallScreenContainer>
    </>
  );
};

export default ManageRoles;
