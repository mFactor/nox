import React from 'react';
import { Layout } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from 'app/less/home';
import AddressSpace from 'opcua/components/address_space.jsx';

const { Content, Sider } = Layout;

/**
 * Base (or root) component for application
 */
@withStyles(style)
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Layout>
        <Sider>
          <AddressSpace />
        </Sider>
        <Content>
          Home content
        </Content>
        <Sider>
          Node properties
          Node actions
        </Sider>
      </Layout>
    );
  }
}
