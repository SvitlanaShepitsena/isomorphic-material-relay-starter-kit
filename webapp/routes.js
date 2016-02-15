import AppLayout from './containers/layout/AppLayout.jsx';
import ViewerQueries from './queries/ViewerQueries';
import QueryType from '../graphql/type/QueryType';

import AboutPage from './containers/pages/AboutPage';
import CitiesSalePage from './containers/pages/CitiesSalePage';
import CitiesRentPage from './containers/pages/CitiesRentPage';
import ContactPage from './containers/pages/ContactPage';
import HomePage from './containers/pages/HomePage.jsx';
import PrivacyPage from './containers/pages/PrivacyPage';
import TermsPage from './containers/pages/TermsPage';
import CityPage from './containers/pages/CityPage';
import ZipTypePage from './containers/pages/ZipTypePage';
<<<<<<< HEAD
import HouseFullPage from './containers/pages/HouseFullPage';
=======
import HousePage from './containers/pages/HousePage';
>>>>>>> full-house

export default [
    {
        path: '/',
        name: 'Home',
        component: AppLayout,
        queries: ViewerQueries,

        indexRoute: {
            component: HomePage,
            queries: ViewerQueries
        },
        childRoutes: [
            {
                path: 'houses-for-sale',
                name: 'Houses for Sale',
                indexRoute: {
                    component: CitiesSalePage,
                    queries: ViewerQueries
                },
                childRoutes: [
                    {
                        path: ":city",
                        indexRoute: {
                            component: CityPage,
                            queries: ViewerQueries
                        },
                        childRoutes: [
                            {
                                path: ":zipType",
                                indexRoute: {
                                    component: ZipTypePage,
                                    queries: ViewerQueries
                                },
                                childRoutes: [
                                    {
                                        path: ":street",
                                        indexRoute: {
<<<<<<< HEAD
                                            component: HouseFullPage,
=======
                                            component: HousePage,
>>>>>>> full-house
                                            queries: ViewerQueries
                                        },
                                    }
                                ]
                            }
                        ]
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
            },
            {
                path: 'contact',
                indexRoute: {
                    component: ContactPage,
                    queries: ViewerQueries
                },
            }
        ]
    },
];
