import AppLayout from './containers/layout/AppLayout.jsx';
import ViewerQueries from './queries/ViewerQueries';

import AboutPage from './containers/pages/AboutPage';
import PrivacyPage from './containers/pages/PrivacyPage';
import TermsPage from './containers/pages/TermsPage';
import CitiesSalePage from './containers/pages/CitiesSalePage';
import CitiesRentPage from './containers/pages/CitiesRentPage';
import ZipTypePage from './containers/pages/ZipTypePage';
import HomePage from './containers/pages/HomePage.jsx';

export default [
    {
        path: '/',
        component: AppLayout,
        queries: ViewerQueries,

        indexRoute: {
            component: HomePage,
            queries: ViewerQueries
        },
        childRoutes: [
            {
                path: 'houses-for-sale',
                indexRoute: {
                    component: CitiesSalePage,
                    queries: ViewerQueries
                },
                childRoutes: [
                    {
                        path: ":city",
                        indexRoute: {
                            component: ZipTypePage,
                            queries: ViewerQueries
                        },
                    }
                ]
            },
            {
                path: 'houses-for-rent',
                indexRoute: {
                    component: CitiesRentPage,
                    queries: ViewerQueries
                },
            },
            {
                path: 'about',
                indexRoute: {
                    component: AboutPage,
                    queries: ViewerQueries
                },
            },
            {
                path: 'terms',
                indexRoute: {
                    component: TermsPage,
                    queries: ViewerQueries
                },
            },
            {
                path: 'privacy',
                indexRoute: {
                    component: PrivacyPage,
                    queries: ViewerQueries
                },
            }
        ]
    },
];
