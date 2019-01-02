import { HomePageContainer } from '../containers/homePage/HomePageContainer';
import { LoginPageContainer } from '../containers/loginPage/LoginPageContainer';
import { RegisterPageContainer } from '../containers/registerPage/RegisterPageContainer';
import { ProfilePage } from '../components/profile';

export const routes = [
    {
        path: '/',
        exact: true,
        isPrivate: true,
        component: HomePageContainer
    },
    {
        path: '/login',
        component: LoginPageContainer
    },
    {
        path: '/register',
        component: RegisterPageContainer
    },
    {
        path: '/profile',
        isPrivate: true,
        component: ProfilePage
    }
];