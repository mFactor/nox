import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Row, Col, Icon, Layout } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { log } from 'base/action.jsx';
import { isServerActive } from 'lib/libastral';
import * as nox from 'opcua/action.jsx';
import style from 'opcua/less/rig';
import Settings from 'opcua/components/settings.jsx';

const { Header } = Layout;

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
      settings: (
        <Settings ref={(settings) => { this.settings = settings; }} />
      ),
      contextMenu: [],
    };
    Object.keys(this.props.opcua).forEach((server) => {
      this.state.contextMenu.push(
        <Menu.Item key="1">1st menu item</Menu.Item>,
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
    console.log('test');
  }

  render() {
    const renderMenu = (
      <Menu onClick={this.handleContextChange}>
        {this.state.contextMenu}
      </Menu>
    );
    return (
      <Header className="rig">
        <Row type="flex" justify="start" align="middle">
          <Col
            sm={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 24 }}
          >
            <ul className="rig-header">
              <li>
                <a onClick={() => this.handleRigAction('connect')}>
                  Connect{` `}
                  <Icon type="link" />
                </a>
              </li>
              <li>
                <a onClick={() => this.handleRigAction('disconnect')}>
                  Disconnect{` `}
                  <Icon type="link" />
                </a>
              </li>
              <li>
                <a onClick={() => this.handleRigAction('disconnect')}>
                  Settings{` `}
                  <Icon type="setting" />
                </a>
              </li>
              <li>
                <Dropdown onClick={() => this.handleRigAction('settings')} overlay={renderMenu}>
                  <a>
                    {this.state.endpoint}{`  `}
                    <Icon type="down" />
                  </a>
                </Dropdown>
              </li>
            </ul>
          </Col>
        </Row>
        {this.state.settings}
      </Header>
    );
  }
}
