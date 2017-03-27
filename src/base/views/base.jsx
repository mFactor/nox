import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { log } from 'base/action.jsx';
import style from 'base/less/base';
import Navbar from 'base/components/navbar.jsx';
import Rig from 'opcua/components/rig.jsx';
import Foot from 'base/components/footer.jsx';

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
export default class Base extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    log: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const msg = `A test log message`;
    this.props.log('info', msg);
  }

  render() {
    return (
      <Layout>
        <Navbar />
        <Rig />
        {this.props.children}
        <Foot />
      </Layout>
    );
  }
}
