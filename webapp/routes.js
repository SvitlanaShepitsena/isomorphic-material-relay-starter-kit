import AppLayout from './containers/layout/AppLayout.jsx';
import ViewerQueries from './queries/ViewerQueries';

import HomePage from './containers/pages/HomePage.jsx';
import AboutPage from './containers/pages/AboutPage';
import CitiesSalePage from './containers/pages/CitiesSalePage';
import CitiesRentPage from './containers/pages/CitiesRentPage';

export default [
    {
        path: '/',
        component: AppLayout,
        queries: ViewerQueries,

        indexRoute: {
            component: HomePage,
            queries: ViewerQueries,
        },
        childRoutes: [
            {
                path: 'houses-for-sale',
                indexRoute: {
                    component: CitiesSalePage,
                    queries: ViewerQueries,
                },
            },
            {
                path: 'houses-for-rent',
                indexRoute: {
                    component: CitiesRentPage,
                    queries: ViewerQueries,
                },
            },
            {
                path: 'about',
                indexRoute: {
                    component: AboutPage,
                    queries: ViewerQueries,
                },
            }
        ]
    },
];
