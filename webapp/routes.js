// REACT  & Relay
import React from 'react';
import {render} from 'react-dom';
import Relay from 'react-relay';

// Router
import {RelayRouter} from 'react-router-relay';
import {Route, browserHistory, Redirect, IndexRedirect} from 'react-router';

import AppLayout from './containers/layout/AppLayout.js';
import ViewerQueries from './queries/ViewerQueries';

import AboutPage from './containers/pages/AboutPage';
import CitiesSalePage from './containers/pages/CitiesSalePage';
import ContactPage from './containers/pages/ContactPage';
import PrivacyPage from './containers/pages/PrivacyPage';
import TermsPage from './containers/pages/TermsPage';
import CityPage from './containers/pages/CityPage';
import HousePage from './containers/pages/houses/HousePage.js';

import ZipTypeHousesListPage from './containers/pages/houses/ZipTypeHousesListPage';
import CityZipTypeHousesListPage from './containers/pages/houses/CityZipTypeHousesListPage';

export default (()=> {
    return (
            <Route path="/" component={AppLayout} queries={ViewerQueries} name="Home">
                <Route path="/houses-for-sale" component={CitiesSalePage} queries={ViewerQueries}
                       name="Chicago North Suburbs Houses for Sale"/>
                <IndexRedirect to="/houses-for-sale"/>
                <Route path="/houses-for-sale/:city" component={CityPage} queries={ViewerQueries}/>
                <Route path="/houses-for-sale/:city/:zipType/:type" component={CityZipTypeHousesListPage}
                       queries={ViewerQueries}/>
                <Route path="/houses-for-sale/:city/:zipType" component={ZipTypeHousesListPage}
                       queries={ViewerQueries}/>

                <Route path="/houses-for-sale/:city/:zipType/:type/:id"
                       component={HousePage}
                       queries={ViewerQueries}
                       preparedParams={(id)=>({id:'123'})}

                />

                <Route path="/about" component={AboutPage} name="Houses for Sale"/>
                <Route path="/privacy" component={PrivacyPage} name="Privacy"/>
                <Route path="/terms" component={TermsPage} name="Terms"/>
                <Route path="/contact" component={ContactPage} name="Contact"/>
            </Route>
    )
})();


