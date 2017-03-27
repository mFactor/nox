import React, { Component } from 'react';
import { Modal, Row, Col, Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

export default class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  addServer = (name, endpoint) => {

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
              >
                <SubMenu
                  key="sub1"
                  title={<span>
                    <Icon type="api" />
                    <span>{`EVR2 Server`}</span>
                  </span>
                        }
                >
        <Menu.Item key="1">Edit</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="api" />
                      <span>{`ITW Elgin`}</span>
                    </span>
                        }
                >
        <Menu.Item key="5">Edit</Menu.Item>
                </SubMenu>
              </Menu>
            </Col>
            <Col span={16}>
              <p>some content...</p>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
