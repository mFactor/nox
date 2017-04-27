import React from 'react';
import { connect } from 'react-redux';
import { ButtonGroup, Button, FormGroup, FormControl } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { log } from 'base/action.jsx';
import Drawer from 'base/components/drawer.jsx';
import AddressSpace from 'opcua/components/address_space.jsx';
import style from 'opcua/static/less/opcua';

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
export default class OpcUa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Drawer side="nav-left">
          <ButtonGroup justified>
            <Button href="#">Connect</Button>
            <Button href="#">Disconnect</Button>
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
          <AddressSpace />
        </Drawer>
        <Drawer side="nav-right" />
      </div>
    );
  }
}
