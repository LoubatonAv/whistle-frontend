import { userService } from '../service/user.service';
import { login, signup } from '../cmps/store/user.action.js';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from './Modal';
import { useNavigate } from 'react-router-dom';

export const LoginSignupModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggleSignUp, setToggleSignUp] = useState(false);

  const [details, setDetails] = useState({
    credentials: userService.getEmptyUser(),
    isSignup: false,
  });

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    fullname: '',
  });

  const onLogin = (e) => {
    e.preventDefault();
    if (!credentials.password || !credentials.username) return;
    dispatch(login(credentials));
    clearState();
    navigate('/');
  };

  const onSignUp = (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password || !credentials.username) return;
    dispatch(signup(credentials));
    clearState();
    navigate('/');
  };

  const clearState = () => {
    const clearTemplate = {
      credentials: userService.getEmptyUser(),
      isSignup: false,
    };
    setDetails(clearTemplate);
  };

  return (
    <div>
      <Modal
        signup={true}
        children={
          <div>
            <h1 className='text-2xl'>Welcome to flute tabs!</h1>
            {!toggleSignUp ? (
              <div className='pt-5'>
                <form onSubmit={(e) => onLogin(e)} className='flex flex-col pt-5 pb-2 '>
                  <div className='pb-6'>
                    <input
                      className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                      type='text'
                      name='username'
                      value={credentials.username}
                      placeholder='Username'
                      onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                      required
                      autoFocus
                    />
                  </div>

                  <div className='pb-6'>
                    <input
                      className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                      type='password'
                      name='password'
                      value={credentials.password}
                      placeholder='Password'
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      required
                    />
                  </div>
                  <button className='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full'>
                    Login!
                  </button>
                </form>
              </div>
            ) : (
              <div className=''>
                <form className='flex flex-col pt-5 pb-2' onSubmit={(e) => onSignUp(e)}>
                  <div className='pb-6'>
                    <input
                      type='text'
                      className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                      name='fullname'
                      value={credentials.fullname}
                      placeholder='Fullname'
                      onChange={(e) => setCredentials({ ...credentials, fullname: e.target.value })}
                      required
                    />
                  </div>
                  <div className='pb-6'>
                    <input
                      type='text'
                      className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                      name='username'
                      value={credentials.username}
                      placeholder='Username'
                      onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                      required
                    />
                  </div>
                  <div className='pb-6'>
                    <input
                      type='password'
                      className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                      name='password'
                      value={credentials.password}
                      placeholder='Password'
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      required
                    />
                  </div>
                  <button className='disabled inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full'>
                    Signup!
                  </button>
                </form>
              </div>
            )}
            {/* <button
              className='disabled inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full'
              onClick={() => setToggleSignUp(!toggleSignUp)}>
              {!toggleSignUp ? <div>REGISTER</div> : <div>Back to login</div>}
            </button> */}
          </div>
        }
      />
    </div>
  );
};
