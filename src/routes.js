import { LoginSignupModal } from './cmps/LoginSignupModal';
import { MelodyPage } from './pages/MelodyPage.jsx';

export const routes = [
  {
    path: '/',
    component: MelodyPage,
  },
  {
    path: '/signup',
    component: LoginSignupModal,
  },
];
