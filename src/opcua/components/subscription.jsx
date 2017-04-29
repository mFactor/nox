import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { log } from 'base/action.jsx';
import { isServerActive } from 'lib/libastral';
import * as nox from 'opcua/action.jsx';
import style from 'opcua/static/less/subscription';

const mapStateToProps = (state) => ({
  opcua: state.opcua,
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
export default class Subscription extends Component {
  static propTypes = {
    // log: React.PropTypes.func.isRequired,
    // opcua: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="container">
        <div
          className="drop-area"
          onDragOver={(event) => { event.preventDefault(); }}
          onDragEnter={(event) => { event.preventDefault(); }}
          onDrop={() => { console.log('dropped'); }}
        >
          Hey bitch
        </div>
      </div>
    );
  }
}
