import AppLayout from './components/AppLayout.jsx';
import ViewerQueries from './queries/ViewerQueries';

import Home_Screen from './components/Home_Screen.jsx';
import Cities from './components/Cities';

export default [
    {
        path: '/',
        component: AppLayout,
        queries: ViewerQueries,
        indexRoute: {
            component: Home_Screen,
            queries: ViewerQueries,
        },
        childRoutes: [
            {
                path: 'houses-for-sale',
                indexRoute: {
                    component: Cities,
                    queries: ViewerQueries,
                },
            }
        ]
    },
];
