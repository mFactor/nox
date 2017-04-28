import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { log } from 'base/action.jsx';
import NavigationBar from 'base/components/navbar';
import Footer from 'base/components/footer';
import style from 'base/static/less/base';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  log: (msg, level) => {
    dispatch(log(msg, level));
  },
});

/**
 * Base (or root) component for application
 */
@withStyles(style)
@connect(mapStateToProps, mapDispatchToProps)
export default class Base extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    // log: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    // const msg = `A test log message`;
    // this.props.log('info', msg);
  }

  render() {
    return (
      <div>
        <NavigationBar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
