import AppLayout from './components/Layout/AppLayout.jsx';
import ViewerQueries from './queries/ViewerQueries';

import HouseScreen from './components/HouseSale/HouseScreen.jsx';
import CitiesSale from './components/CitiesSale/CitiesSale.js';
import CitiesRent from './components/CitiesRent/CitiesRent.js';

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
                    component: CitiesSale,
                    queries: ViewerQueries,
                },
            },
            {
                path: 'houses-for-rent',
                indexRoute: {
                    component: CitiesRent,
                    queries: ViewerQueries,
                },
            }
        ]
    },
];
