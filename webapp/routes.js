// REACT  & Relay
import React from 'react';
import {render} from 'react-dom';
import Relay from 'react-relay';

// Router
import {RelayRouter} from 'react-router-relay';
import {Route, browserHistory} from 'react-router';

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

import ZipTypeHousesListPage from './containers/pages/houses/ZipTypeHousesListPage';
import CityZipTypeHousesListPage from './containers/pages/houses/CityZipTypeHousesListPage';

export default (()=> {
    return (
        <RelayRouter history={browserHistory}>
            <Route path="/" component={AppLayout} queries={ViewerQueries} name="Home">
                <Route path="/houses-for-sale" component={CitiesSalePage} queries={ViewerQueries}
                       name="Houses for Sale"/>
                <Route path="/houses-for-sale/:city" component={CityPage} queries={ViewerQueries}/>
                <Route path="/houses-for-sale/:city/:zipType/:type" component={CityZipTypeHousesListPage}
                       queries={ViewerQueries}/>
                <Route path="/houses-for-sale/:city/:zipType" component={ZipTypeHousesListPage}
                       queries={ViewerQueries}/>

                <Route path="/about" component={AboutPage} queries={ViewerQueries} name="Houses for Sale"/>
            </Route>
        </RelayRouter>
    )
})();


