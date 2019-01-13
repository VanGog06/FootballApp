import { HomePageContainer } from '../containers/homePage/HomePageContainer';
import { LoginPageContainer } from '../containers/loginPage/LoginPageContainer';
import { RegisterPageContainer } from '../containers/registerPage/RegisterPageContainer';
import { ProfilePage } from '../components/profile';
import { StandingsPageContainer } from '../containers/standingsPage/StandingsPageContainer';
import { TeamPageContainer } from '../containers/teamPage/TeamPageContainer';

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
    },
    {
        path: '/profile',
        isPrivate: true,
        component: ProfilePage
    },
    {
        path: '/competitions/:country',
        isPrivate: true,
        component: StandingsPageContainer
    },
    {
        path: '/teams/team/:id',
        isPrivate: true,
        component: TeamPageContainer
    }
];