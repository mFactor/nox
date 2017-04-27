import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { log } from 'base/action.jsx';
import style from 'home/static/less/home';

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
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <div className="container">
          Hello mFactor
        </div>
      </div>
    );
  }
}
