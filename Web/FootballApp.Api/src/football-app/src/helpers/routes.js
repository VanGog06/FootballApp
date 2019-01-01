import { HomePageContainer } from '../containers/homePage/HomePageContainer';
import { LoginPageContainer } from '../containers/loginPage/LoginPageContainer';
import { RegisterPageContainer } from '../containers/registerPage/RegisterPageContainer';

export const routes = [
    {
        path: '/',
        exact: true,
        component: HomePageContainer
    },
    {
        path: '/login',
        component: LoginPageContainer
    },
    {
        path: '/register',
        component: RegisterPageContainer
    }
];