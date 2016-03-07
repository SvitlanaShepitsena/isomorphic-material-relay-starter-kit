// REACT  & Relay
import React from 'react';
import {render} from 'react-dom';
import Relay from 'react-relay';

// Router
import {RelayRouter} from 'react-router-relay';
import {Route, IndexRoute, browserHistory, Redirect, IndexRedirect} from 'react-router';

import AppLayout from './containers/layout/AppLayout.js';
import ViewerQueries from './queries/ViewerQueries';
/*=common*/
import HomePage from './containers/pages/common/HomePage';
import AboutPage from './containers/pages/common/AboutPage';
import ContactPage from './containers/pages/common/ContactPage';
import PrivacyPage from './containers/pages/common/PrivacyPage';
import TermsPage from './containers/pages/common/TermsPage';
/*=house*/
import HousePage from './containers/pages/house/HousePage.js';
/*=city*/
import CitiesSalePage from './containers/pages/city/CitiesSalePage';
import CityPage from './containers/pages/city/CityPage';
import ZipTypeHousesListPage from './containers/pages/house/ZipTypeHousesListPage';
import CityZipTypeHousesListPage from './containers/pages/house/CityZipTypeHousesListPage';

import SearchPage from './containers/pages/search/SearchPage';

export default (()=> {
    return (
        <Route path="/" component={AppLayout} queries={ViewerQueries} name="App">
            <IndexRoute component={HomePage} queries={ViewerQueries} name="Home"/>

            <Route path="/houses-for-sale" component={CitiesSalePage} queries={ViewerQueries} name="Chicago North Suburbs Houses for Sale"/>
            <Route path="/houses-for-sale/:city" component={CityPage} queries={ViewerQueries}/>
            <Route path="/houses-for-sale/:city/:zipType" component={ZipTypeHousesListPage} queries={ViewerQueries}/>
            <Route path="/houses-for-sale/:city/:zipType/:type" component={CityZipTypeHousesListPage} queries={ViewerQueries}/>
            <Route path="/houses-for-sale/:city/:zipType/:type/:id" component={HousePage} queries={ViewerQueries} preparedParams={(id)=>({id:'123'})}/>

            <Route path="/search/:query" component={SearchPage} queries={ViewerQueries} name="Search"/>

            <Route path="/about" component={AboutPage} name="Houses for Sale"/>
            <Route path="/privacy" component={PrivacyPage} name="Privacy"/>
            <Route path="/terms" component={TermsPage} name="Terms"/>
            <Route path="/contact" component={ContactPage} name="Contact"/>
        </Route>
    )
})();


