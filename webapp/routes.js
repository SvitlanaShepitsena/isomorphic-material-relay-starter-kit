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
import HomePage from './containers/pages/common/HomePage/HomePage';
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
import Error404 from './components/Error404/Error404.js';

import SearchPage from './containers/pages/search/SearchPage';

function paginate(nextState, replace) {


    var page = nextState.params.page;

    if (!page) {
        console.log(nextState);
        var params = nextState.params;
        params.page = 1;
        nextState.params.page = 1;
        replace({
            pathname: nextState.location.pathname + '/1',

        });

    } else{
        if (!page.match(/^\d+$/)) {
            replace({
                pathname: nextState.location.pathname + '/1',

            });

        }
    }

};
function check(nextState, replace) {
    var page = nextState.params.page;
    debugger;
    if (page) {
        if (page.match(/\w+/g)) {
            var holder = page;
            nextState.params.page = null;
            nextState.params.id = holder;
            console.log(nextState);
            replace({pathname: '/houses-for-sale', params: nextState.params});
        }
    }
};

export default (()=> {
    return (
        <Route path="/" component={AppLayout} name="App">
            <IndexRoute component={HomePage} queries={ViewerQueries} name="Home"/>

            <Route path="/houses-for-sale" component={CitiesSalePage} queries={ViewerQueries}
                   name="Chicago North Suburbs Houses for Sale"/>

            <Route path="/houses-for-sale/:city" component={CityPage} queries={ViewerQueries}/>

            <Route path="/houses-for-sale/:city/:zipType(/:page)" component={ZipTypeHousesListPage}
                   queries={ViewerQueries}
                   onEnter={paginate}
            />
            <Route path="/houses-for-sale/:city/:zipType/:type(/:page)" component={CityZipTypeHousesListPage}
                   queries={ViewerQueries} onEnter={paginate}/>

            <Route path="/houses-for-sale/:city/:zipType/:type/:id/:realty" component={HousePage}
                   queries={ViewerQueries}/>

            <Route path="/search/:query" component={SearchPage} queries={ViewerQueries} name="Search"/>

            <Route path="/about" component={AboutPage} name="Houses for Sale"/>
            <Route path="/privacy" component={PrivacyPage} name="Privacy"/>
            <Route path="/terms" component={TermsPage} name="Terms"/>
            <Route path="/contact" component={ContactPage} name="Contact"/>
            <Route path="*" component={Error404} name="Error404"/>
        </Route>
    )
})();


