import React, { Component } from 'react';
import { Modal, Row, Col, Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

/**
 * Settings component for Nox
 */
export default class Settings extends Component {
  constructor(props) {
    super(props);
    // Note that the servers are here as defaults
    // The ability to add, remove, and edit will happen here, as well as security selection
    this.state = {
      visible: false,
      servers: [
        {
          name: 'Hannover Demo',
          endpoint: 'opc.tcp://mfactorengineering.com:4840',
          active: false,
          disconnected: true,
        },
        {
          name: 'EVR2 Simulation',
          endpoint: 'opc.tcp://mfactorengineering.com:4840',
          active: true,
          disconnected: true,
        },
      ],
      subMenus: [],
    };

    this.state.servers.forEach((server) => {
      const title = (
        <span>
          <Icon type="api" />
          <span>{`${server.name}`}</span>
        </span>
      );
      this.state.subMenus.push(
        <SubMenu
          key={server.name}
          title={title}
        >
          <Menu.Item key={`${server.name}_edit`}>
            <Icon type="edit" />
            Edit
          </Menu.Item>
        </SubMenu>,
      );
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (err) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (err) => {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
        <Modal
          title="OPC UA Settings"
          visible={this.state.visible}
          okText="Change Settings"
          onOk={this.handleOk}
          cancelText="Cancel"
          width="768px"
          onCancel={this.handleCancel}
        >
          <Row>
            <Col span={8}>
              <Menu
                style={{ width: `240px` }}
                mode="inline"
                defaultOpenKeys={[this.state.servers[0].name]}
                defaultSelectedKeys={[`${this.state.servers[0].name}_edit`]}
              >
                {this.state.subMenus}
              </Menu>
            </Col>
            <Col span={16}>
              <p>Edit server</p>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
