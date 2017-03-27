import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Button, Row, Col, Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { log } from 'base/action.jsx';
import * as nox from 'opcua/action.jsx';
import style from 'opcua/less/rig';
import Settings from 'opcua/components/settings.jsx';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => ({
  log: (msg, level) => {
    dispatch(log(msg, level));
  },
  connect: (endpoint) => {
    dispatch(nox.connect(endpoint));
  },
});

/**
 * Base (or root) component for application
 */
@withStyles(style)
@connect(mapStateToProps, mapDispatchToProps)
export default class Rig extends Component {
  static propTypes = {
    log: React.PropTypes.func.isRequired,
    connect: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      sessions: '',
      endpoint: 'opc.tcp://mfactorengineering.com:4840',
      menu: (
        <Menu onClick={null}>
          <Menu.Item key="1">1st menu item</Menu.Item>
          <Menu.Item key="2">2nd menu item</Menu.Item>
          <Menu.Item key="3">3d menu item</Menu.Item>
        </Menu>
      ),
    };
  }

  componentDidMount() {
  }

  handleClick = (err) => {
    this.settings.showModal();
  }

  render() {
    return (
      <div>
        <Row align="bottom" justify="space-around">
          <div className="rig">
            <Col span={24}>
              <ul className="tools">
                <li onClick={() => this.props.connect(this.state.endpoint)}>
                  <a><Icon type="plus" /></a>
                </li>
                <li><a><Icon type="minus" /></a></li>
                <li><a><Icon type="key" /></a></li>
                <li><a><Icon type="disconnect" /></a></li>
                <li onClick={() => this.handleClick()}><a><Icon type="setting" /></a></li>
              </ul>
            </Col>
          </div>
        </Row>
        <Settings ref={(settings) => { this.settings = settings; }} />
      </div>
    );
  }
}
