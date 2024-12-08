import React, { useState } from "react";
import styled from "styled-components";
import { IoSearchOutline } from "react-icons/io5";

//Importing ThemeContext
import { useTheme } from "../context/ThemeContext";

//Importing components
import Sidebar from "../common/Sidebar";
import SmallscreenSidebar from "../common/SmallscreenSidebar";

// Styled Components
const DashboardContainer = styled.div`
  width: auto;
  display: flex;
  margin-bottom: 1rem;
  height: 80vh;
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
  margin-bottom: 20px;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
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

const SectionHeading = styled.h2`
  font-size: 20px;
  margin: 0;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1.5px solid ${(props) => (props.$isDarkMode ? "#fff" : "#ddd")};
  border-radius: 5px;
  background-color: ${(props) =>
    props.$isDarkMode
      ? "#000"
      : "#fff"};
  padding: 5px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};

  input {
    border: none;
    outline: none;
    color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
    background-color: ${(props) => (props.$isDarkMode ? "#000" : "#fff")};
    font-size: 16px;
    margin-left: 10px;
    flex: 1;
  }
  @media (max-width: 768px) {
    margin: 1rem 0rem;
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
    padding: 15px 15px;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
    background-color: #444;
    border-bottom: 2px solid #ff5722;
  }
`;


const TableBody = styled.tbody`
  tr {
    &:nth-child(even) {
      background-color: ${(props) => (props.$isDarkMode ? "#222" : "#e8f5e9")};
    }
    &:nth-child(odd) {
      background-color: ${(props) => (props.$isDarkMode ? "#333" : "#ffffff")};
    }
    &:hover {
      background-color: ${(props) => (props.$isDarkMode ? "#555" : "#c8e6c9")};
      transition: background-color 0.3s ease-in-out;
    }
  }

  td {
    padding: 15px 20px;
    font-size: 14px;
    color: ${(props) => (props.$isDarkMode ? "#fafafa" : "#212121")};
    text-align: center;
    border-bottom: 1px solid ${(props) => (props.$isDarkMode ? "#555" : "#ddd")};
  }
`;


const Status = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 15px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: ${(props) =>
    props.className === "active"
      ? "linear-gradient(90deg, #4caf50, #81c784)"
      : "linear-gradient(90deg, #f44336, #e57373)"};
  color: ${(props) => (props.className === "active" ? "#ffffff" : "#ffe6e6")};
  box-shadow: ${(props) =>
    props.className === "active"
      ? "0 4px 8px rgba(76, 175, 80, 0.2)"
      : "0 4px 8px rgba(244, 67, 54, 0.2)"};
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
const AvatarUsernameWrapper = styled.div`
  align-items: center;
  gap: 16px;
  padding: 10px 15px;
  border-radius: 10px;

  &:hover {
    background-color: #e9ecef;
    border-color: #cfd8dc;
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }
`;


const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 10px;
  padding: 10px 0;
  background-color: ${(props) => (props.$isDarkMode ? "#1a1a1a" : "#ffffff")};
  border-top: 2px solid ${(props) => (props.$isDarkMode ? "#444" : "#ddd")};
  transition: background-color 0.3s ease, border-color 0.3s ease;
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
  text-align: left;
  padding: 15px 25px;
  font-size: 14px;
  color: #721c24;
  background: linear-gradient(90deg, #f8d7da, #f5c6cb);
  border-left: 5px solid #dc3545;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  max-width: 600px;
  margin: 20px auto;
`;


//Styled Components for small screens

const SmallScreenDashboard = styled.div`
  @media (max-width: 768px) {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 25px;
    background: ${(props) =>
      props.$isDarkMode
        ? "linear-gradient(180deg, #1c1c1c, #292929)"
        : "linear-gradient(180deg, #ffffff, #f0f0f0)"};
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
  }
  display: none;
`;

const Container = styled.div`
  color: ${(props) => (props.$isDarkMode ? "#e0e0e0" : "#333")};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0;
  padding: 15px;
  border-bottom: ${(props) =>
    props.$isDarkMode ? "1px solid #444" : "1px solid #ddd"};
`;

const UserCard = styled.div`
  background: ${(props) =>
    props.$isDarkMode
      ? "linear-gradient(145deg, #2b2b2b, #383838)"
      : "linear-gradient(145deg, #ffffff, #f1f1f1)"};
  border-radius: 15px;
  padding: 20px;
  box-shadow: ${(props) =>
    props.$isDarkMode
      ? "6px 6px 12px #1c1c1c, -6px -6px 12px #404040"
      : "6px 6px 12px #d9d9d9, -6px -6px 12px #ffffff"};
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const UserMeta = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#333")};
`;

const MetaData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  color: ${(props) => (props.$isDarkMode ? "#ccc" : "#555")};
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

const CardUsername = styled.h3`
  font-size: 20px;
  margin: 0;
  font-weight: bold;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  text-transform: capitalize;
`;

const CardRole = styled.p`
  font-size: 15px;
  margin: 0;
  color: ${(props) => (props.$isDarkMode ? "#b3b3b3" : "#666")};
  font-style: italic;
`;

const CardEmail = styled.p`
  font-size: 15px;
  margin: 0;
  color: ${(props) => (props.$isDarkMode ? "#eaecee" : "#444")};
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: ${(props) => (props.$isDarkMode ? "#ffcccb" : "#007bff")};
  }
`;

const CardLowerWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 10px;
  border-top: ${(props) =>
    props.$isDarkMode ? "1px solid #555" : "1px solid #ddd"};
  color: ${(props) => (props.className === "active" ? "#28a745" : "#dc3545")};
  font-weight: bold;
`;


function Dashboard() {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const tableData = [
    {
      id: 1,
      username: "Rahul Mishra",
      email: "rahul.mishra@example.com",
      role: "Admin",
      permission: "Read, Write, Delete",
      createdDate: "2024-01-15",
      status: "Active",
    },
    {
      id: 2,
      username: "Sneha Kapoor",
      email: "sneha.kapoor@example.com",
      role: "User",
      permission: "Read",
      createdDate: "2024-02-20",
      status: "Inactive",
    },
    {
      id: 3,
      username: "Kartik Aryan",
      email: "kartik.aryan@example.com",
      role: "Moderator",
      permission: "Read, Delete",
      createdDate: "2024-03-25",
      status: "Active",
    },
    {
      id: 4,
      username: "Meera Joshi",
      email: "meera.joshi@example.com",
      role: "Manager",
      permission: "Read, Write",
      createdDate: "2024-04-05",
      status: "Inactive",
    },
    {
      id: 5,
      username: "Alok Verma",
      email: "alok.verma@example.com",
      role: "Admin",
      permission: "Read, Write, Delete",
      createdDate: "2024-05-10",
      status: "Active",
    },
    {
      id: 6,
      username: "Priya Sharma",
      email: "priya.sharma@example.com",
      role: "User",
      permission: "Read",
      createdDate: "2024-06-08",
      status: "Active",
    },
    {
      id: 7,
      username: "Ravi Nair",
      email: "ravi.nair@example.com",
      role: "Manager",
      permission: "Read, Write",
      createdDate: "2024-07-15",
      status: "Inactive",
    },
    {
      id: 8,
      username: "Sonia Mehta",
      email: "sonia.mehta@example.com",
      role: "Moderator",
      permission: "Read, Delete",
      createdDate: "2024-08-12",
      status: "Active",
    },
    {
      id: 9,
      username: "Vikram Singh",
      email: "vikram.singh@example.com",
      role: "Admin",
      permission: "Read, Write, Delete",
      createdDate: "2024-09-01",
      status: "Inactive",
    },
    {
      id: 10,
      username: "Anjali Gupta",
      email: "anjali.gupta@example.com",
      role: "User",
      permission: "Read",
      createdDate: "2024-10-05",
      status: "Active",
    },
    {
      id: 11,
      username: "Arjun Desai",
      email: "arjun.desai@example.com",
      role: "Manager",
      permission: "Read, Write",
      createdDate: "2024-01-10",
      status: "Active",
    },
    {
      id: 12,
      username: "Neha Sethi",
      email: "neha.sethi@example.com",
      role: "Moderator",
      permission: "Read, Delete",
      createdDate: "2024-02-18",
      status: "Inactive",
    },
    {
      id: 13,
      username: "Rohit Malhotra",
      email: "rohit.malhotra@example.com",
      role: "Admin",
      permission: "Read, Write, Delete",
      createdDate: "2024-03-12",
      status: "Active",
    },
    {
      id: 14,
      username: "Ishita Roy",
      email: "ishita.roy@example.com",
      role: "User",
      permission: "Read",
      createdDate: "2024-04-09",
      status: "Inactive",
    },
    {
      id: 15,
      username: "Sahil Jain",
      email: "sahil.jain@example.com",
      role: "Manager",
      permission: "Read, Write",
      createdDate: "2024-05-22",
      status: "Active",
    },
    {
      id: 16,
      username: "Tanya Khanna",
      email: "tanya.khanna@example.com",
      role: "Moderator",
      permission: "Read, Delete",
      createdDate: "2024-06-15",
      status: "Active",
    },
    {
      id: 17,
      username: "Vivek Chawla",
      email: "vivek.chawla@example.com",
      role: "Admin",
      permission: "Read, Write, Delete",
      createdDate: "2024-07-08",
      status: "Inactive",
    },
    {
      id: 18,
      username: "Nisha Pillai",
      email: "nisha.pillai@example.com",
      role: "User",
      permission: "Read",
      createdDate: "2024-08-25",
      status: "Active",
    },
    {
      id: 19,
      username: "Kabir Sharma",
      email: "kabir.sharma@example.com",
      role: "Moderator",
      permission: "Read, Delete",
      createdDate: "2024-09-18",
      status: "Active",
    },
    {
      id: 20,
      username: "Divya Menon",
      email: "divya.menon@example.com",
      role: "Manager",
      permission: "Read, Write",
      createdDate: "2024-10-02",
      status: "Inactive",
    },
  ];
  
  // Filter the users based on the search query
  const filteredUsers = tableData.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <DashboardContainer>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <MainContent $isDarkMode={isDarkMode}>
          <Header $isDarkMode={isDarkMode}>Dashboard</Header>
          <Separator />
          <TopBar>
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
          </TopBar>

          {/* Show error message if no users match */}
          {filteredUsers.length === 0 && searchQuery !== "" && (
            <ErrorMessage>No users found matching "{searchQuery}"</ErrorMessage>
          )}

          {filteredUsers.length > 0 && (
            <TableContainer $isDarkMode={isDarkMode}>
              <Table>
                <TableHead>
                  <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Permission</th>
                    <th>Created Date</th>
                    <th>Status</th>
                  </tr>
                </TableHead>
                <TableBody $isDarkMode={isDarkMode}>
                  {currentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>
                        <AvatarUsernameWrapper>
                          <span>{user.username}</span>
                        </AvatarUsernameWrapper>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.permission}</td>
                      <td>{user.createdDate}</td>
                      <td>
                        <Status
                          className={
                            user.status === "Active" ? "active" : "inactive"
                          }
                        >
                          {user.status}
                        </Status>
                      </td>
                    </tr>
                  ))}
                </TableBody>
              </Table>
              <PaginationWrapper>
                {Array.from(
                  { length: Math.ceil(filteredUsers.length / usersPerPage) },
                  (_, index) => (
                    <PageButton
                      key={index + 1}
                      onClick={() => handlePageClick(index + 1)}
                    >
                      {index + 1}
                    </PageButton>
                  )
                )}
              </PaginationWrapper>
            </TableContainer>
          )}
        </MainContent>
      </DashboardContainer>

      <SmallScreenDashboard $isDarkMode={isDarkMode}>
        <Container $isDarkMode={isDarkMode}>
          <h1>Dashboard</h1>
          <SmallscreenSidebar />
        </Container>
        <Separator />
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

        {currentUsers.map((user) => (
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
                <CardRole $isDarkMode={isDarkMode}>{user.role}</CardRole>
                <Status
                  className={user.status === "Active" ? "active" : "inactive"}
                >
                  {user.status}
                </Status>
              </CardLowerWrap>
            </CardContent>
          </UserCard>
        ))}
        <PaginationWrapper>
          {Array.from(
            { length: Math.ceil(filteredUsers.length / usersPerPage) },
            (_, index) => (
              <PageButton
                key={index + 1}
                onClick={() => handlePageClick(index + 1)}
              >
                {index + 1}
              </PageButton>
            )
          )}
        </PaginationWrapper>
      </SmallScreenDashboard>
    </>
  );
}

export default Dashboard;
