import Chrome from './components/Chrome.jsx';
import Home_Screen from './components/Home_Screen.jsx';
import ViewerQueries from './queries/ViewerQueries';

export default [
    {
        path: '/',
        component: Chrome,
        queries: ViewerQueries,
        indexRoute: {
            component: Home_Screen,
            queries: ViewerQueries,
        }
    },
];
