import React from 'react';
import { connect } from 'react-redux';
import { Menu, Icon, Row, Col, Layout } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { log } from 'base/action.jsx';
import style from 'base/less/navbar';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header } = Layout;

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
        <Row type="flex" justify="start" align="middle">
          <Col
            sm={{ span: 4 }}
            lg={{ span: 4 }}
            xl={{ span: 4 }}
          >
            mFactor OPCUA
          </Col>
          <Col
            sm={{ span: 20 }}
            lg={{ span: 20 }}
            xl={{ span: 20 }}
          >
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
              theme="light"
            >
              <Menu.Item key="client">
                <Icon type="laptop" />
                UA Client
              </Menu.Item>
              <Menu.Item key="graphics">
                <Icon type="dot-chart" />
                Graphics
              </Menu.Item>
              <Menu.Item key="about">
                <Icon type="info-circle-o" />
                About
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
    );
  }
}
