import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { RiToggleLine, RiToggleFill } from "react-icons/ri";

//Importing ThemeContext
import { useTheme } from "../../context/ThemeContext";

// Importing components
import AddUserModal from "../manageusers/AddUser";
import EditUserModal from "../manageusers/EditUser";
import Sidebar from "../../common/Sidebar";
import SmallscreenSidebar from "../../common/SmallscreenSidebar";


// Styled Components
const ManageUsersContainer = styled.div`
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
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
`;


const Header = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 0px;
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
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1.5px solid ${(props) => (props.$isDarkMode ? "#fff" : "#ddd")};
  border-radius: 5px;
  background-color: ${(props) => (props.$isDarkMode ? "#000" : "#fff")};
  padding: 5px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  input {
    border: none;
    outline: none;
    color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
    background-color: ${(props) => (props.$isDarkMode ? "#000" : "#fff")};
    font-size: 16px;
    margin-left: 10px;
    flex: 1;
  }
`;


const TableContainer = styled.div`
  margin-top: 20px;
  padding-bottom: 10px;
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#fff")};
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
  background-color: #333;
  color: #f7f7f7;
  border-radius: 8px;

  th {
    text-align: left;
    padding: 15px 15px;
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
    background-color: #444;
    border-bottom: 2px solid #ff5722;
  }
`;

const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: ${(props) => (props.$isDarkMode ? "#444" : "#f9f9f9")};
  }

  td {
    padding: 10px 10px;
    color: ${(props) => (props.$isDarkMode ? "#ccc" : "#333")};
  }
`;


const UsernameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

const ActionButton = styled.button`
  margin-top: 3px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  background-color: white;
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

const DeleteButton = styled.button`
  margin-top: 3px;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: white;
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

const ActionIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  font-size: 14px;
`;

const EditIcon = styled(FaRegEdit)`
  font-size: 18px;
  color: #3498db;
  transition: color 0.3s ease;

  &:hover {
    color: #2980b9;
  }
`;

const DeleteIcon = styled(MdOutlineDelete)`
  font-size: 18px;
  color: #e74c3c;
  transition: color 0.3s ease;

  &:hover {
    color: #c0392b;
  }
`;

const AddIcon = styled(IoMdAdd)`
  font-size: 15px;
  color: #2ecc71;
  margin-right: 4px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const AddNewUserWrapper = styled.div`
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


const StatusToggleButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 15px;
  gap: 10px;
  ${(props) =>
    props.status &&
    `
    color: ${props.status === "Active" ? "#28a745" : "#dc3545"};
  `}
`;

const ActiveIconContainer = styled.div`
  font-size: 22px;
  color: #2ecc71;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const InactiveIconContainer = styled.div`
  font-size: 22px;
  color: #e74c3c;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;


const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 10px;
  padding: 10px 0;
  background-color: #f9f9f9;
  border-top: 2px solid #ddd;
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

const ErrorMessage = styled.div`
  width: 100%;
  text-align: center;
  padding: 18px;
  font-size: 18px;
  color: #e74c3c;
  background-color: #f2d7d5;
  border-radius: 8px;
  border: 1px solid #e74c3c;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;


const SmallScreenContainer = styled.div`
  @media (max-width: 768px) {
    min-height: 77.5vh;
    display: block;
    padding: 20px;
    color: ${(props) => (props.$isDarkMode ? "#ccc" : "#333")};
    background-color: ${(props) => (props.$isDarkMode ? "#1a1a1a" : "#f9f9f9")};
  }
  display: none;
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
`;

const MetaData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 5px;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
`;


// Styled components specific to small screens

const SmallScreenCardContainer = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;

    gap: 20px;
  }
`;

const Container = styled.div`
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom:0;
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
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
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

const Status = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  background-color: ${(props) =>
    props.className === "active" ? "#2ecc71" : "#e74c3c"};
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;


const ManageUsers = () => {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "Vikram Singh",
      email: "vikram.singh@example.com",
      status: "Active",
    },
    {
      id: 2,
      username: "Priya Kapoor",
      email: "priya.kapoor@example.com",
      status: "Inactive",
    },
    {
      id: 3,
      username: "Ayesha Malik",
      email: "ayesha.malik@example.com",
      status: "Active",
    },
    {
      id: 4,
      username: "Rohit Sharma",
      email: "rohit.sharma@example.com",
      status: "Inactive",
    },
    {
      id: 5,
      username: "Maya Jain",
      email: "maya.jain@example.com",
      status: "Active",
    },
    {
      id: 6,
      username: "Arjun Mehta",
      email: "arjun.mehta@example.com",
      status: "Inactive",
    },
    {
      id: 7,
      username: "Neha Joshi",
      email: "neha.joshi@example.com",
      status: "Active",
    },
    {
      id: 8,
      username: "Ravi Gupta",
      email: "ravi.gupta@example.com",
      status: "Inactive",
    },
  ]);
  const [modalState, setModalState] = useState({
    isOpen: false,
    isEditMode: false,
    userToEdit: null,
  });

  // Filter users based on search query
  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, users]
  );

  // Add a new user
  const handleAddUser = (newUser) => {
    const newUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    const userWithDefaultImage = {
      ...newUser,
      id: newUserId,
      status: "Active",
    };
    setUsers((prevUsers) => [...prevUsers, userWithDefaultImage]);
    setModalState({ isOpen: false, isEditMode: false, userToEdit: null });
  };

  // Toggle user status
  const handleToggleStatus = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  };

  // Edit an existing user
  const handleEditUser = (user) => {
    setModalState({ isOpen: true, isEditMode: true, userToEdit: user });
  };

  // Update an existing user
  const handleUpdateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setModalState({ isOpen: false, isEditMode: false, userToEdit: null });
  };

  // Delete a user with confirmation
  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    }
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const startId = (currentPage - 1) * usersPerPage + 1;
  const endId = currentPage * usersPerPage;

  // Filter users based on the calculated ID range
  const currentUsers = filteredUsers.filter(
    (user) => user.id >= startId && user.id <= endId
  );

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <ManageUsersContainer>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <MainContent $isDarkMode={isDarkMode}>
          <Header>Manage Users</Header>
          <Separator />
          <TopBar>
            <SectionHeading>User List</SectionHeading>
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
                <AddNewUserWrapper>
                  <AddIcon />
                  Add New User
                </AddNewUserWrapper>
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
                    <th>Status</th>
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
                        <StatusToggleButton
                          $status={user.status}
                          onClick={() => handleToggleStatus(user.id)}
                        >
                          {user.status === "Active" ? (
                            <>
                              <ActiveIconContainer>
                                <RiToggleFill />
                              </ActiveIconContainer>
                              Active
                            </>
                          ) : (
                            <>
                              <InactiveIconContainer>
                                <RiToggleLine />
                              </InactiveIconContainer>
                              Inactive
                            </>
                          )}
                        </StatusToggleButton>
                      </td>
                      <td>
                        <ActionButton onClick={() => handleEditUser(user)}>
                          <ActionIcon>
                            <EditIcon />
                            
                          </ActionIcon>
                        </ActionButton>
                        <DeleteButton onClick={() => handleDeleteUser(user.id)}>
                          <ActionIcon>
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

          {/* Pagination Section */}
          <PaginationWrapper>
            {Array.from(
              { length: Math.ceil(filteredUsers.length / usersPerPage) },
              (_, index) => (
                <PageButton
                  key={index + 1}
                  onClick={() => handlePageClick(index + 1)}
                  style={{
                    backgroundColor:
                      currentPage === index + 1 ? "#1e6e99" : "#2e86c1",
                  }}
                >
                  {index + 1}
                </PageButton>
              )
            )}
          </PaginationWrapper>

          {/* Modals */}
          {modalState.isEditMode ? (
            <EditUserModal
              isOpen={modalState.isOpen}
              onClose={() =>
                setModalState({
                  isOpen: false,
                  isEditMode: false,
                  userToEdit: null,
                })
              }
              userData={modalState.userToEdit}
              onSave={handleUpdateUser}
            />
          ) : (
            <AddUserModal
              isOpen={modalState.isOpen}
              onClose={() => setModalState({ isOpen: false })}
              onSave={handleAddUser}
            />
          )}
        </MainContent>
      </ManageUsersContainer>

      {/* Small Screen Layout(users in the form of cards) */}

      <SmallScreenContainer $isDarkMode={isDarkMode}>
        <SmallScreenCardContainer $isDarkMode={isDarkMode}>
          <Container $isDarkMode={isDarkMode}>
            <h1>Manage Users</h1>
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
              backgroundColor: "#2ecc71",
              color: "white",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "1.5rem",
              fontSize: "14px",
              fontWeight: "600",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#27ae60"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#2ecc71"}
          >
            <AddNewUserWrapper>
              <AddIcon />
              Add New User
            </AddNewUserWrapper>
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
                  <Status
                    className={user.status === "Active" ? "active" : "inactive"}
                  >
                    {user.status}
                  </Status>

                  <div>
                    <ActionButton onClick={() => handleEditUser(user)}>
                      <ActionIcon>
                        <EditIcon />
                        Edit
                      </ActionIcon>
                    </ActionButton>
                    <DeleteButton onClick={() => handleDeleteUser(user.id)}>
                      <ActionIcon>
                        <DeleteIcon />
                        Delete
                      </ActionIcon>
                    </DeleteButton>
                  </div>
                </CardLowerWrap>
              </CardContent>
            </UserCard>
          ))}
          {/* Pagination Section */}
          <PaginationWrapper>
            {Array.from(
              { length: Math.ceil(filteredUsers.length / usersPerPage) },
              (_, index) => (
                <PageButton
                  key={index + 1}
                  onClick={() => handlePageClick(index + 1)}
                  style={{
                    backgroundColor:
                      currentPage === index + 1 ? "#1e6e99" : "#2e86c1",
                  }}
                >
                  {index + 1}
                </PageButton>
              )
            )}
          </PaginationWrapper>
          {/* Modals */}
          {modalState.isEditMode ? (
            <EditUserModal
              isOpen={modalState.isOpen}
              onClose={() =>
                setModalState({
                  isOpen: false,
                  isEditMode: false,
                  userToEdit: null,
                })
              }
              userData={modalState.userToEdit}
              onSave={handleUpdateUser}
            />
          ) : (
            <AddUserModal
              isOpen={modalState.isOpen}
              onClose={() => setModalState({ isOpen: false })}
              onSave={handleAddUser}
            />
          )}
        </SmallScreenCardContainer>
      </SmallScreenContainer>
    </>
  );
};

export default ManageUsers;
