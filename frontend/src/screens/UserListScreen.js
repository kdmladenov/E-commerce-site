import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';

const UserListScreen = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const deleteUserHandler = (userId) => {
    console.log('deleteuser');
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.fullName}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fa fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fa fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/user/${user.userId}/edit}`}>
                    <button type="button" className="btn">
                      <i className="fa fa-edit"></i>
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => deleteUserHandler(user.userId)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserListScreen;
