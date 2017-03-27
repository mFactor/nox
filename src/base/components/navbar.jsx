import React from 'react';
import { connect } from 'react-redux';
import { Menu, Icon, Row, Col, Layout } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { log } from 'base/action.jsx';
import style from 'base/less/navbar';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header } = Layout;

const mapStateToProps = (state) => {
  return {

  };
};

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
export default class Navbar extends React.Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <Header className="navbar-header">
        <Row>
          <Col span={4}>
            Nox OPCUA Clients suck ass
          </Col>
          <Col span={6} offset={14}>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
              theme="light"
            >
              <Menu.Item key="mail">
                <Icon type="mail" />
                Home
              </Menu.Item>
              <Menu.Item key="performance">
                <Icon type="appstore" />
                Performance
              </Menu.Item>
              <Menu.Item key="about">
                <Icon type="appstore" />
                About
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
    );
  }
}
