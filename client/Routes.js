import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Routes, Switch, Redirect } from "react-router-dom";
import { Login } from "./components/authForms/Login";
import { Signup } from "./components/authForms/SignUp";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import SingleProject from "./components/SingleProject";
import AllProjects from "./components/AllProjects2";
import AddProjectForm from "./components/AddProjectForm";
import ScientistsDropDown from "./components/smallComponents/ScientistsDropDown";
import TestingPage from "./components/Testing";
import ProjectDashboard from "./components/ProjectDashboard";
import ProfilePage from "./components/userProfile/ProfilePage";
import AboutPage from "./components/AboutPage";

import { me } from "./store";

//blockchain
import Web3 from "web3";

import { loadWeb3, loadAccount } from "./store/interactions";

/**
 * COMPONENT
 */
class Routers extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
          <Route path="projects" element={<AllProjects />} />
          <Route path="projects/:id" element={<SingleProject />} />
          <Route path="dropdown" element={<ScientistsDropDown />} />
          <Route path="test" element={<TestingPage />} />
          <Route path="user/:id" element={<ProfilePage />} />
        </Routes>
        {isLoggedIn ? (
          <Routes>
            <Route path="addproject" element={<AddProjectForm />} />
            <Route path="dashboard/:id" element={<ProjectDashboard />} />
            {/* <Route path="/loggedin" element={<Home />} /> */}
          </Routes>
        ) : (
          <Routes>
            {/* <Route path="/notloggedin" element={<Login />} /> */}

            <Route path="login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Routers);
