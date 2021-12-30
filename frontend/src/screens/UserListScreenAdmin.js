// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteUser, listUsers } from '../actions/userActions';
// import Loader from '../components/Loader';
// import Message from '../components/Message';
// import Button from '../components/Button';
// import { Link } from 'react-router-dom';
// import Tooltip from '../components/Tooltip';
// // import './styles/UserListScreenAdmin.css';

// // TO DELETE

// const UserListScreenAdmin = ({ history }) => {
//   const dispatch = useDispatch();

//   const userList = useSelector((state) => state.userList);
//   const { loading, error, users } = userList;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const userDelete = useSelector((state) => state.userDelete);
//   const { success: deleteSuccess } = userDelete;

//   useEffect(() => {
//     // only admins to have access to the url
//     if (userInfo?.role === 'admin') {
//       dispatch(listUsers());
//     } else {
//       history.push('/login');
//     }
//   }, [dispatch, history, userInfo, deleteSuccess]);

//   // TO DO implement restore user
//   const deleteUserHandler = (userId) => {
//     window.confirm('Are your sure you want to delete this user?');
//     dispatch(deleteUser(userId));
//   };

//   return (
//     <div className="user_list container">
//       <h1>Users</h1>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message type="error">{error}</Message>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>NAME</th>
//               <th>EMAIL</th>
//               <th>ADMIN</th>
//               <th>DELETED</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.userId}>
//                 <td>{user.userId}</td>
//                 <td>{user.fullName}</td>
//                 <td>
//                   <a href={`mailto:${user.email}`}>{user.email}</a>
//                 </td>
//                 <td>
//                   {user.role === 'admin' ? (
//                     <Tooltip text="Admin">
//                       <i className="fa fa-check" style={{ color: 'green' }}></i>
//                     </Tooltip>
//                   ) : (
//                     <Tooltip text="Not Admin">
//                       <i className="fa fa-times" style={{ color: 'red' }}></i>
//                     </Tooltip>
//                   )}
//                 </td>
//                 <td>
//                   {user.isDeleted ? (
//                     <Tooltip text="Not Deleted">
//                       <i className="fa fa-check" style={{ color: 'green' }}></i>
//                     </Tooltip>
//                   ) : (
//                     <Tooltip text="Deleted">
//                       <i className="fa fa-times" style={{ color: 'red' }}></i>
//                     </Tooltip>
//                   )}
//                 </td>
//                 {!user.isDeleted && (
//                   <td>
//                     <Link to={`/admin/user/${user.userId}/edit`}>
//                       <Button classes="icon">
//                         <Tooltip text="Edit">
//                           <i className="fa fa-edit"></i>
//                         </Tooltip>
//                       </Button>
//                     </Link>
//                     <Button classes="icon" onClick={() => deleteUserHandler(user.userId)}>
//                       <Tooltip text="Delete">
//                         <i className="fas fa-trash"></i>
//                       </Tooltip>
//                     </Button>
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default UserListScreenAdmin;
