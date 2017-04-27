import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { log, toggleDrawer } from 'base/action.jsx';
import style from 'base/static/less/drawer';

const mapStateToProps = (state) => ({
  drawer: state.base.drawer,
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
export default class Drawer extends React.Component {
  static propTypes = {
    drawer: PropTypes.shape({
      collapsed: PropTypes.bool,
    }).isRequired,
    toggleDrawer: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      className: 'collapsed',
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.drawer.collapsed !== this.props.drawer.collapsed) {
      let className = null;
      if (nextProps.drawer.collapsed) {
        className = 'collapsed';
      }
      this.setState({
        className,
      });
    }
  }

  handleClick = () => {
    this.props.toggleDrawer();
  }

  render() {
    return (
      <div
        role="presentation"
        className={`nav-drawer ${this.state.className}`}
        onClick={() => { this.handleClick(); }}
      >
        <Nav bsStyle="pills" stacked activeKey={1}>
          <NavItem eventKey={1} href="#" className="nav-item">
            NavItem 1
          </NavItem>
          <NavItem eventKey={2} title="Item" className="nav-item">
            NavItem 2
          </NavItem>
        </Nav>
      </div>
    );
  }
}
