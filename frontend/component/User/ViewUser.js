import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/');
        setUsers(response.data.users);
      } catch (error) {
        setError('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Users</h1>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {users.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No users found</p>
      ) : (
        <TableContainer component={Paper} style={{ margin: 'auto', maxWidth: '80%', marginBottom: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Security Question</TableCell>
                <TableCell>Security Answer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    {user.securityQuestion ? (
                      <>
                        {user.securityQuestion.split(' ')[0]}
                        {'*'.repeat(user.securityQuestion.split(' ').slice(1).join(' ').length)}
                      </>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    {user.securityAnswer ? (
                      '*'.repeat(user.securityAnswer.length)
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ViewUsers;
