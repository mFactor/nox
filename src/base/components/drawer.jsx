import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';
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
    children: PropTypes.node,
    drawer: PropTypes.shape({
      collapsed: PropTypes.bool,
    }).isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    side: PropTypes.string.isRequired,
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
        className={`nav-drawer ${this.props.side} ${this.state.className}`}
        onClick={() => { this.handleClick(); }}
      >
        {this.props.children}
      </div>
    );
  }
}
