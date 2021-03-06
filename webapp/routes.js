// REACT  & Relay
import React from 'react';
// Router
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

import SearchResultPage from './containers/pages/search/SearchResultPage';
import SearchPage from './containers/pages/common/SearchPage.js';

function paginate(nextState, replace) {
    let {page} = nextState.params;
    let {pathname} = nextState.location;

    let page1 = `${pathname}/1`;

    if (!page) {
        replace({
            pathname: page1
        });

    } else {
        if (!page.match(/^\d+$/)) {
            replace({
                pathname: page1
            });
        }
        if (page == '0') {
            const lastParam = pathname.lastIndexOf('/');
            let baseUrl = pathname.substr(0, lastParam);
            let startPage = `${baseUrl}/1`;
            replace({
                pathname: startPage
            });
        }
    }
};

export default (()=> {
    return (
        <Route path="/" component={AppLayout} name="App">
            <IndexRoute component={HomePage} queries={ViewerQueries} name="Home"/>
            <Redirect from="/houses-for-sale" to="/homes-for-sale"/>
            <Redirect from="/houses-for-sale/:city" to="/homes-for-sale/:city"/>
            <Redirect from="/houses-for-sale/:city/:zipType(/:page)" to="/homes-for-sale/:city/:zipType(/:page)"/>
            <Redirect from="/houses-for-sale/:city/:zip/:type(/:page)" to="/homes-for-sale/:city/:zip/:type(/:page)"/>
            <Redirect from="/houses-for-sale/:city/:zipType/:type/:id/:realty"
                      to="/homes-for-sale/:city/:zipType/:type/:id/:realty"/>

            <Route path="/homes-for-sale" component={CitiesSalePage} queries={ViewerQueries}
                   name="Chicago North Suburbs Houses for Sale"/>
            <Route path="/homes-for-sale/:city" component={CityPage} queries={ViewerQueries}/>
            <Route path="/homes-for-sale/:city/:zipType(/:page)" component={ZipTypeHousesListPage}
                   queries={ViewerQueries}/>
            <Route path="/homes-for-sale/:city/:zip/:type(/:page)" component={CityZipTypeHousesListPage}
                   queries={ViewerQueries}/>
            <Route path="/homes-for-sale/:city/:zipType/:type/:id/:realty" component={HousePage}
                   queries={ViewerQueries}/>
            <Route path="/search/:query(/:page)" component={SearchResultPage} queries={ViewerQueries} name="Search"
                   onEnter={paginate}/>
            <Route path="/residential-real-estate" component={SearchPage} name="Residential"/>
            <Route path="/about" component={AboutPage} name="About"/>
            <Route path="/privacy" component={PrivacyPage} name="Privacy"/>
            <Route path="/terms" component={TermsPage} name="Terms"/>
            <Route path="/contact" component={ContactPage} name="Contact"/>
            <Route path="*" component={Error404} name="Error404"/>
        </Route>
    )
})();


