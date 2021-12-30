// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { register } from '../actions/userActions';
// import Loader from '../components/Loader';
// import Message from '../components/Message';
// import './styles/RegisterScreen.css';

// const RegisterScreenOLD = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [reenteredPassword, setReenteredPassword] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [address, setAddress] = useState('');
//   const [address2, setAddress2] = useState('');
//   const [city, setCity] = useState('');
//   const [zip, setZip] = useState('');
//   const [state, setState] = useState('');
//   const [country, setCountry] = useState('');
//   const [message, setMessage] = useState('');

//   const dispatch = useDispatch();

//   const userRegister = useSelector((state) => state.userRegister);
//   const {
//     loading,
//     error
//     // userInfo
//   } = userRegister;

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (password !== reenteredPassword) {
//       setMessage('The passwords do not match.');
//     } else {
//       dispatch(
//         register(email, password, reenteredPassword, fullName, address, city, zip, state, country)
//       );
//     }
//   };
//   return (
//     <div className="register">
//       <div className="register_container">
//         <h1>Register</h1>
//         {message && <Message type="error">{message}</Message>}
//         {loading && <Loader />}
//         {error && <Message type="error">{error}</Message>}
//         <form className="form">
//           <div className="formLeft">
//             <h5>Full Name</h5>
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//             />
//             <h5>E-mail</h5>
//             <input
//               type="email"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <h5>Phone number</h5>
//             <input
//               type="tel"
//               placeholder="xxx-xxx-xxxx"
//               value={phone}
//               pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
//               onChange={(e) => setPhone(e.target.value)}
//             />
//             <h5>Password</h5>
//             <input
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <h5>Reenter Password</h5>
//             <input
//               type="password"
//               placeholder="Reenter Password"
//               value={reenteredPassword}
//               onChange={(e) => setReenteredPassword(e.target.value)}
//             />
//           </div>
//           <div className="formRight">
//             <h5>Address</h5>
//             <input
//               type="text"
//               placeholder="Address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//             <h5>Address 2</h5>
//             <input
//               type="text"
//               placeholder="Address 2"
//               value={address2}
//               onChange={(e) => setAddress2(e.target.value)}
//             />
//             <h5>City</h5>
//             <input
//               type="text"
//               placeholder="City"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//             />
//             <h5>Zip</h5>
//             <input
//               type="text"
//               placeholder="Zip"
//               value={zip}
//               onChange={(e) => setZip(e.target.value)}
//             />
//             <h5>State</h5>
//             <input
//               type="text"
//               placeholder="State"
//               value={state}
//               onChange={(e) => setState(e.target.value)}
//             />
//             <h5>Country</h5>
//             <input
//               type="text"
//               placeholder="Country"
//               value={country}
//               onChange={(e) => setCountry(e.target.value)}
//             />
//           </div>
//           <button className="registerButton" onClick={submitHandler}>
//             Register
//           </button>
//         </form>
//         <div className="registerRedirect">
//           Already have an account?
//           <Link to={'/login'}> Log in</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterScreenOLD;
