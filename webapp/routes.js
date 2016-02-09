import AppLayout from './components/Layout/AppLayout.jsx';
import ViewerQueries from './queries/ViewerQueries';

import HouseScreen from './components/HouseSale/HouseScreen.jsx';
import Cities from './components/CitiesSale/Cities.js';

export default [
    {
        path: '/',
        component: AppLayout,
        queries: ViewerQueries,
        indexRoute: {
            component: HouseScreen,
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
