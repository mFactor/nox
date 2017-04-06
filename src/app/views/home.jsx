import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { log } from 'base/action.jsx';
import style from 'app/less/home';
import AddressSpace from 'opcua/components/address_space.jsx';
import BrowseNode from 'opcua/components/browse_node.jsx';

const { Content, Sider } = Layout;

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
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

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
          <BrowseNode />
        </Sider>
      </Layout>
    );
  }
}
