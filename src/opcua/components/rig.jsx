import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup, Button, FormGroup, FormControl } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { log } from 'base/action.jsx';
import { isServerActive } from 'lib/libastral';
import * as nox from 'opcua/action.jsx';
import style from 'opcua/static/less/rig';
// import Settings from 'opcua/components/settings.jsx';

const mapStateToProps = (state) => ({
  opcua: state.opcua,
});

const mapDispatchToProps = (dispatch) => ({
  log: (msg, level) => {
    dispatch(log(msg, level));
  },
  connect: (endpoint) => {
    dispatch(nox.connect(endpoint));
  },
  disconnect: (endpoint) => {
    dispatch(nox.disconnect(endpoint));
  },
});

/**
 * Base (or root) component for application
 */
@withStyles(style)
@connect(mapStateToProps, mapDispatchToProps)
export default class Rig extends Component {
  static propTypes = {
    // log: React.PropTypes.func.isRequired,
    opcua: React.PropTypes.object.isRequired,
    connect: React.PropTypes.func.isRequired,
    disconnect: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      endpoint: isServerActive(this.props.opcua),
      loading: false,
      settings: null,
      contextMenu: [],
    };
    Object.keys(this.props.opcua).forEach((server) => {
      this.state.contextMenu.push(
      );
    });
  }

  componentWillReceiveProps(nextProps) {
    const endpoint = isServerActive(nextProps.opcua);
    if (endpoint) {
      // Show connected endpoint
      this.setState({
        endpoint,
        loading: false,
      });
    }
  }

  handleRigAction = (action) => {
    switch (action) {
      case 'connect':
        this.props.connect(this.state.endpoint);
        this.setState({
          loading: true,
        });
        break;
      case 'disconnect':
        this.props.disconnect(this.state.endpoint);
        break;
      case 'settings':
        this.settings.showModal();
        break;
      default:
        break;
    }
  }

  handleContextChange = () => {
  }

  render() {
    return (
      <div className="rig">
        <ButtonGroup justified>
          <Button
            className="rig-action"
            href="#"
            onClick={() => { this.handleRigAction('connect'); }}
          >
            Connect
          </Button>
          <Button
            className="rig-action"
            href="#"
            onClick={() => { this.handleRigAction('disconnect'); }}
          >
            Disconnect
          </Button>
        </ButtonGroup>
        <form>
          <FormGroup controlId="formBasicText">
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="opc.tcp://mfactor.com:4840"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
        </form>
      </div>
    );
  }
}
