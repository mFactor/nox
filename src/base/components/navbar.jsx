import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col, Nav, Navbar, NavItem } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { log, toggleDrawer } from 'base/action.jsx';
import style from 'base/static/less/navbar';
import mfeLogo from 'base/static/img/mfe_main.png';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  log: (msg, level) => {
    dispatch(log(msg, level));
  },
  toggleDrawer: () => {
    dispatch(toggleDrawer());
  },
});

/**
 * Navigation bar component for site
 */
@withStyles(style)
@connect(mapStateToProps, mapDispatchToProps)
export default class NavigationBar extends React.Component {
  static propTypes = {
    toggleDrawer: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.social = ['github', 'twitter', 'linkedin', 'facebook'];
    this.menues = ['Nox OPCUA', 'Performance', 'About'];
    this.state = {
      collapsed: false,
      navMenu: [],
      socialLinks: [],
    };
    this.menues.forEach((menuItem, iter) => {
      const cappedTitle = menuItem.charAt(0).toUpperCase() + menuItem.slice(1);
      this.state.navMenu.push(
        <NavItem
          eventKey={iter}
          className="nav-link"
          key={menuItem}
        >
          {cappedTitle}
        </NavItem>,
      );
    });
    this.social.forEach((site) => {
      this.state.socialLinks.push(
        <NavItem key={site} eventKey={1} className="nav-social">
          <i className={`fa fa-${site} fa-2x social-icons`} />
        </NavItem>,
      );
    });
  }

  componentDidMount() {
  }

  handleAction = () => {
    this.props.toggleDrawer();
  }

  render() {
    return (
      <div className="navbar-parent">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="mfactorengineering.com">
                <img src={mfeLogo} height="50" alt="MFE Logo" />
              </a>
            </Navbar.Brand>
            <Link onClick={() => this.handleAction()}>
              <i className="fa fa-bars fa-2x pull-right" id="side-menu" />
            </Link>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {this.state.navMenu}
            </Nav>
            <Nav pullRight>
              {this.state.socialLinks}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
