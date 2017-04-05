import React from 'react';
import { connect } from 'react-redux';
import { Tree, Input } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { validateProp } from 'lib/libastral';
import style from 'opcua/less/address_space';
import { log } from 'base/action.jsx';
import * as nox from 'opcua/action.jsx';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

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

@withStyles(style)
@connect(mapStateToProps, mapDispatchToProps)
export default class AddressSpace extends React.Component {

  static propTypes = {
    opcua: React.PropTypes.object.isRequired,
  }

  constructor() {
    super();
    this.state = {
      addrSpace: null,
    };
    this.nodes = [];
  }

  componentDidMount() {

  }

  /**
   *
   */
  componentWillReceiveProps(nextProps) {
    const servers = Object.keys(nextProps.opcua);

    // If server is active, populate address space
    let addrSpace = null;
    servers.forEach((server) => {
      if (nextProps.opcua[server].isActive && nextProps.opcua[server].isConnected) {
        const innerSpace = this.populate(nextProps.opcua[server].addressSpace);
        addrSpace = (
          <Tree
            defaultExpandAll
            onSelect={this.onSelect}
          >
            {innerSpace}
          </Tree>
        );
      }
    });
    this.setState({
      addrSpace,
    });
  }

  /**
   * Build address space UI tree
   * TODO: Prevent infinite recursion somehow, maybe level tracking limit
   */
  populate = (addressSpace) => {
    const tmpNodes = [];
    addressSpace.forEach((iter) => {
      if (iter.organizes) {
        const nextNodes = this.populate(iter.organizes);
        if (nextNodes.length > 0) {
          tmpNodes.push(
            <TreeNode title={iter.browseName} key={iter.nodeId}>
              {nextNodes}
            </TreeNode>,
          );
        } else {
          tmpNodes.push(
            <TreeNode title={iter.browseName} key={iter.nodeId} />,
          );
        }
      } else {
        // Bottom of tree
        tmpNodes.push(
          <TreeNode title={iter.browseName} key={iter.nodeId} />,
        );
      }
    });
    return tmpNodes;
  }

  /**
   * Browse selected node
   */
  onSelect = (selectedKeys, info) => {
    console.log(selectedKeys);
  }


  render() {
    return (
      <div>
        {this.state.addrSpace}
      </div>
    );
  }
}
