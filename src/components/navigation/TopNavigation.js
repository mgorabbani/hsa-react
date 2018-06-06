import React from "react";
import PropTypes from "prop-types";
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { connect } from "react-redux";
import { NavLink as RouterNavLink } from "react-router-dom";
import gravatarUrl from "gravatar-url";
import { Button } from 'antd';
import * as actions from "../../actions/auth";


class TopNavigation extends React.Component {
  state = {
    isOpen: false
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { user, logout, isAuthenticated } = this.props;

    return (
      <Navbar light expand="sm" style={{ borderBottom: '1px solid #E8E7DE' }}>
        <NavbarBrand tag={RouterNavLink} activeClassName="active" to={user ? '/dashboard' : '/'}>
          <img
            className="img-fluid"
            width="200"
            src={require('../../assets/hsa-student-logo.png')}

            alt="Gravatar"
          />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink
                tag={RouterNavLink}
                activeClassName="active"
                to="/search-graduate"
              >
                Search Profiles
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RouterNavLink}
                activeClassName="active"
                to="/visa-interviews"
              >
                Visa Interviews
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RouterNavLink}
                activeClassName="active"
                to="/visa-interviews"
              >
                University Suggestion
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            {!isAuthenticated && <NavItem>
              <NavLink
                tag={RouterNavLink}
                to="/login"
              >
                <Button type="primary">Login</Button>

              </NavLink>
            </NavItem>}
            {isAuthenticated &&
              <UncontrolledDropdown nav>
                <DropdownToggle nav>
                  <img
                    className="img-fluid rounded-circle"
                    src={gravatarUrl(user.email, { size: 40 })}
                    alt="Gravatar"
                  />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem><NavLink
                    tag={RouterNavLink}
                    activeClassName="active"
                    to="/profile-basics"
                  >
                    Edit Profile
              </NavLink></DropdownItem>
                  <DropdownItem><NavLink
                    tag={RouterNavLink}
                    activeClassName="active"
                    to="/settings"
                  >
                    Settings
              </NavLink></DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => logout()}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  logout: PropTypes.func.isRequired,
  setLocale: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    isAuthenticated: !!state.user.email,
  };
}

export default connect(
  mapStateToProps,
  { logout: actions.logout },
  null,
  {
    pure: false
  }
)(TopNavigation);