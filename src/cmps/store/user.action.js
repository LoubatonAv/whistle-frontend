import { userService } from '../../service/user.service';
export function login(credentials) {
  return async (dispatch) => {
    try {
      const user = await userService.login(credentials);
      dispatch({ type: 'SET_USER', user });
    } catch (err) {
      console.log('no user found', err);
    }
  };
}

export function signup(credentials) {
  return async (dispatch) => {
    try {
      const user = await userService.signup(credentials);
      dispatch({ type: 'SET_USER', user });
    } catch (err) {
      console.log('Cannot signup');
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      await userService.logout();
      dispatch({ type: 'SET_USER', user: null });
    } catch (err) {
      console.log('Cannot logout');
    }
  };
}
