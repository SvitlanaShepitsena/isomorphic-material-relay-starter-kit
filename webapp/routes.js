import AppLayout from './containers/layout/AppLayout.js';
import ViewerQueries from './queries/ViewerQueries';

import AboutPage from './containers/pages/AboutPage';
import CitiesSalePage from './containers/pages/CitiesSalePage';
import CitiesRentPage from './containers/pages/CitiesRentPage';
import ContactPage from './containers/pages/ContactPage';
import HomePage from './containers/pages/HomePage.js';
import PrivacyPage from './containers/pages/PrivacyPage';
import TermsPage from './containers/pages/TermsPage';
import CityPage from './containers/pages/CityPage';

import ZipHousesListPage from './containers/pages/ZipHousesListPage';
import ZipTypeHousesListPage from './containers/pages/ZipTypeHousesListPage';
import TypeHousesListPage from './containers/pages/TypeHousesListPage';
import HousePage from './containers/pages/HousePage';

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
                                path: ":zip",
                                indexRoute: {
                                    component: ZipHousesListPage,
                                    queries: ViewerQueries
                                },

                                childRoutes: [
                                    {
                                        path: ":type",
                                        indexRoute: {
                                            component: ZipTypeHousesListPage,
                                            queries: ViewerQueries
                                        },

                                        childRoutes: [
                                            {
                                                path: ":street",
                                                indexRoute: {
                                                    component: HousePage,
                                                    queries: ViewerQueries
                                                },
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                path: "type/:type",
                                indexRoute: {
                                    component: TypeHousesListPage,
                                    queries: ViewerQueries
                                }

                            },

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
