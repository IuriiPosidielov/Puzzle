import React, { useState } from 'react';
import { skipToken } from "@reduxjs/toolkit/query";
import { useDrfTokenCreateMutation,
  useJwtTokenCreateMutation,
  useJwtTokenRefreshCreateMutation} from '../../store/puzzleApi';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { login, logout} from './authSlice';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


function Auth() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginMut] = useDrfTokenCreateMutation();
  const onSubmit = () => {         
         loginMut({authToken: {username: userName, password: password, token: ""}}).unwrap().then((token) => {console.log(token);dispatch(login(token.token));}).catch((error) => console.log(error));         
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
	{!token ? (
    	<Stack spacing={2}> 
		<TextField id="outlined-basic" label="Username" variant="outlined" onChange={(e) => setUserName(e.target.value)} value={userName} />
		<TextField type="password" id="outlined-basic" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} value={password} />
		<Button variant="contained" onClick={()=>onSubmit()}>Login</Button>
    	</Stack>
	) : (
	<Button variant="contained" onClick={()=>dispatch(logout())}>Log out</Button>
	)}
    </Box>
  );
}

export default Auth;
