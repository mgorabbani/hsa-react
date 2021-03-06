import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import Loader from "react-loader";

import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import SignupPage from "./components/pages/SignupPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import TopNavigation from "./components/navigation/TopNavigation";
import SearchPage from "./components/pages/SearchPage";
import { fetchCurrentUserRequest } from "./actions/users";
import ProfileBasicsPage from "./components/pages/ProfileBasicsPage";
import FooterArea from './components/pages/FooterArea'
import ProfileDetails from './components/pages/ProfileDetails'
import './assets/style.css';
import InsightsPage from "./components/pages/InsightsPage";
import RecommenderPage from "./components/pages/RecommenderPage";
class App extends React.Component {
  componentDidMount() {
    if (this.props.isAuthenticated) this.props.fetchCurrentUserRequest();
  }

  render() {
    const { location, loaded } = this.props;
    return (

      <div>
        <Loader loaded={loaded}>

          <TopNavigation />
          <section style={{ minHeight: '85vh' }} className="home-area" >
            <Route location={location} path="/" exact component={HomePage} />
            <Route
              location={location}
              path="/confirmation/:token"
              exact
              component={ConfirmationPage}
            />
            <GuestRoute
              location={location}
              path="/login"
              exact
              component={LoginPage}
            />
            {/* <GuestRoute
              location={location}
              path="/signup"
              exact
              component={SignupPage}
            /> */}
            <GuestRoute
              location={location}
              path="/forgot_password"
              exact
              component={ForgotPasswordPage}
            />
            <GuestRoute
              location={location}
              path="/reset_password/:token"
              exact
              component={ResetPasswordPage}
            />
            <UserRoute
              location={location}
              path="/dashboard"
              exact
              component={DashboardPage}
            />
            <UserRoute
              location={location}
              path="/search-graduate"
              exact
              component={SearchPage}
            />
            <UserRoute
              location={location}
              path="/profile-basics"
              exact
              component={ProfileBasicsPage}
            />
            <UserRoute
              location={location}
              path="/profile-details/:id"
              exact
              component={ProfileDetails}
            />

            <UserRoute
              location={location}
              path="/insights"
              exact
              component={InsightsPage}
            />
            <UserRoute
              location={location}
              path="/university-recommendation"
              exact
              component={RecommenderPage}
            />
          </section>
          <FooterArea />
        </Loader>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  fetchCurrentUserRequest: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email,
    loaded: state.user.loaded,
  };
}

export default connect(mapStateToProps, { fetchCurrentUserRequest })(App);
