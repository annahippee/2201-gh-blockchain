import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

//style
import {
  Button,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Avatar,
  Tooltip,
  Typography,
  Grid,
  Drawer,
  MenuItem,
} from "@mui/material";

import { Menu } from "@mui/icons-material";

// const links = [
//   {
//     label: "Projects",
//     link: "/addproject",
//     always: true,
//   },
//   {
//     label: "Start A Project",
//     link: "/addproject",
//     always: false,
//     isLoggedIn: true,
//     isScientist: true,
//   },
//   {
//     label: "Dashboard",
//     link: `/dashboard/${auth.id}`,
//     always: false,
//     isLoggedIn: true,
//     isScientist: true,
//   },
//   {
//     label: "My Profile",
//     link: `/user/${auth.id}`,
//     always: false,
//     isLoggedIn: true,
//   },
//   {
//     label: "Logout",
//     link: `/user/${auth.id}`,
//     always: false,
//     isLoggedIn: true,
//   },
// ];

const Navbar = ({ handleClick, isLoggedIn, auth, profileImg }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar>
        {Logo}
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <Menu color="primary" />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Grid item xs={3}>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                }}
              >
                <Grid item xs={3} sx={{ minWidth: "60px" }}>
                  <Link to="/">
                    <Box
                      component="img"
                      sx={{
                        height: "50px",
                        margin: "10px",
                        marginBottom: "4px",
                      }}
                      alt="DeSci Funder"
                      src="/logo.png"
                    />
                  </Link>
                </Grid>
                <Grid item xs={9}>
                  <Link to="/">
                    <Typography
                      color="primary"
                      variant="h5"
                      sx={{
                        fontFamily: "Roboto Condensed",
                        marginBottom: "4px",
                      }}
                    >
                      De
                      <span className="main-title-span">Sci </span>Funder
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Grid>

            {/* <Grid item xs = {10} */}
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}

                {/* <Link to="/about">
              <Button>About</Button>
            </Link> */}
                <Link to="/projects">
                  <Button>Projects</Button>
                </Link>
                {auth.scientist ? (
                  <>
                    <Link to="/addproject">
                      <Button>Start A Project</Button>
                    </Link>
                    <Link to={`/dashboard/${auth.id}`}>
                      <Button>Dashboard</Button>
                    </Link>
                  </>
                ) : null}
                <Link to={`/user/${auth.id}`}>
                  <Button>My Profile</Button>
                </Link>
                <a href="/login" onClick={handleClick}>
                  <Button>Logout</Button>
                </a>
                <Tooltip title="My Profile">
                  <Link to={`/user/${auth.id}`}>
                    <IconButton onClick={handleOpenUserMenu}>
                      <Avatar
                        alt="Remy Sharp"
                        src={profileImg}
                        sx={{ width: 60, height: 60 }}
                      />
                    </IconButton>
                  </Link>
                </Tooltip>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}

                {/* <Link to="/about">
              <Button>About</Button>
            </Link> */}
                <Link to="/projects">
                  <Button>Projects</Button>
                </Link>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </Grid>
        </Drawer>
      </Toolbar>
    );
  };

  const Logo = (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      <Grid item xs={3} sx={{ minWidth: "60px" }}>
        <Link to="/">
          <Box
            component="img"
            sx={{
              height: "50px",
              margin: "10px",
              marginBottom: "4px",
            }}
            alt="DeSci Funder"
            src="/logo.png"
          />
        </Link>
      </Grid>
      <Grid item xs={9}>
        <Link to="/">
          <Typography
            color="primary"
            variant="h5"
            sx={{
              fontFamily: "Roboto Condensed",
              marginBottom: "4px",
            }}
          >
            De
            <span className="main-title-span">Sci </span>Funder
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );

  const getMenuButtons = () => {
    return (
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        {/* <Grid item xs = {10} */}
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}

            {/* <Link to="/about">
        <Button>About</Button>
      </Link> */}
            <Link to="/projects">
              <Button>Projects</Button>
            </Link>
            {auth.scientist ? (
              <>
                <Link to="/addproject">
                  <Button>Start A Project</Button>
                </Link>
                <Link to={`/dashboard/${auth.id}`}>
                  <Button>Dashboard</Button>
                </Link>
              </>
            ) : null}
            <Link to={`/user/${auth.id}`}>
              <Button>My Profile</Button>
            </Link>
            <a href="/login" onClick={handleClick}>
              <Button>Logout</Button>
            </a>
            <Tooltip title="My Profile">
              <Link to={`/user/${auth.id}`}>
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar
                    alt="Remy Sharp"
                    src={profileImg}
                    sx={{ width: 60, height: 60 }}
                  />
                </IconButton>
              </Link>
            </Tooltip>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}

            {/* <Link to="/about">
        <Button>About</Button>
      </Link> */}
            <Link to="/projects">
              <Button>Projects</Button>
            </Link>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
      </Grid>
    );
  };
  return (
    <header>
      <AppBar position="fixed" elevation={0} style={{ background: "#051f2e" }}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
    profileImg: state.auth.profileImg,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
