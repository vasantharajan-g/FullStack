// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import axios from 'axios';

// const App = () => {
//   const [isRegistered, setIsRegistered] = useState(true);
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleToggleForm = () => {
//     setIsRegistered((prev) => !prev);
//   };

//   const handleAuthentication = async () => {
//     try {
//       const apiUrl = isRegistered
//         ? 'http://127.0.0.1:5000/signin'
//         : 'http://127.0.0.1:5000/signup';

//       const requestData = isRegistered
//         ? { username_or_email: email, password }
//         : { username, email, password };

//       await axios.post(apiUrl, requestData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       console.log(isRegistered ? 'Login successful (API):' : 'Registration successful (API):');
//     } catch (error) {
//       console.error(`${isRegistered ? 'Login' : 'Registration'} error:`, error.message);
//     }
//   };

//   return (
//     <Router>
//       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <Switch>
//           <Route path="/registration">
//             <div>
//               <h2 style={{ color: '#ffff' }}>Registration</h2>
//               {!isRegistered && (
//                 <div>
//                   <label htmlFor="username" style={{ color: '#ffff' }}>
//                     User Name:
//                   </label>
//                   <input
//                     type="text"
//                     id="username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                   />
//                 </div>
//               )}
//               <label htmlFor="email" style={{ color: '#ffff' }}>
//                 Email:
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <label htmlFor="password" style={{ color: '#ffff' }}>
//                 Password:
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button onClick={handleAuthentication}>
//                 {isRegistered ? 'Login' : 'Register'}
//               </button>
//               <p onClick={handleToggleForm} style={{ color: '#ffff' }}>
//                 {isRegistered
//                   ? 'Need to register? Click here.'
//                   : 'Already registered? Click here to login.'}
//               </p>
//             </div>
//           </Route>
//           <Route path="/login">
//             <div>
//               <h2 style={{ color: '#ffff' }}>Login</h2>
//               <label htmlFor="email" style={{ color: '#ffff' }}>
//                 Email:
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <label htmlFor="password" style={{ color: '#ffff' }}>
//                 Password:
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button onClick={handleAuthentication}>Login</button>
//               <p onClick={handleToggleForm} style={{ color: '#ffff' }}>
//                 {isRegistered
//                   ? 'Need to register? Click here.'
//                   : 'Already registered? Click here to login.'}
//               </p>
//             </div>
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// };

// export default App;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import ThemeProvider and createTheme
import Login from './components/login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CRUD from './components/CRUD';
// import CRUD from './components/CRUD';

// Define your theme
const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
          {/* <Route path="/register" component={Register} /> */}
          <Route path="/dashboard" element={<Dashboard/>} />
          {/* <Route path="/crud" component={CRUD} /> */}
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/crud" element={<CRUD />}/>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
