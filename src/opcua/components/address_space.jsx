import React from 'react';
import { connect } from 'react-redux';
import { Tree, Input } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { isServerConnected } from 'lib/libastral';
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
  browse: (endpoint, nodeId) => {
    dispatch(nox.browse(endpoint, nodeId));
  },
});

@withStyles(style)
@connect(mapStateToProps, mapDispatchToProps)
export default class AddressSpace extends React.Component {

  static propTypes = {
    opcua: React.PropTypes.object.isRequired,
    browse: React.PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.state = {
      endpoint: null,
      addressSpaceTree: null,
    };
    this.nodes = [];
  }

  componentDidMount() {

  }

  /**
   * Update component on Redux store update
   */
  componentWillReceiveProps(nextProps) {
    const endpoint = isServerConnected(nextProps.opcua);

    // If server is connected, populate address space
    let addressSpaceTree = null;
    if (endpoint) {
      const innerTree = this.traverseSpace(nextProps.opcua[endpoint].addressSpace);
      addressSpaceTree = innerTree;
      /*
      addressSpaceTree = (
        <Tree
          showLine={true}
          showIcon={true}
          defaultExpandedKeys={['ns=1;i=85']}
          onSelect={this.onSelect}
        >
          {innerTree}
        </Tree>
      );
      */
    }
    this.setState({
      endpoint,
      addressSpaceTree,
    });
  }

  /**
   * Browse selected node on click (Ant called it on select for some reason...)
   */
  onSelect = (selectedKeys, info) => {
    this.props.browse(this.state.endpoint, selectedKeys[0]);
  }

  /**
   * Build address space UI tree
   * TODO: Prevent infinite recursion somehow, maybe level tracking limit
   */
  traverseSpace = (addressSpace) => {
    const tmpNodes = [];
    addressSpace.forEach((iter) => {
      if (iter.organizes) {
        const nextNodes = this.traverseSpace(iter.organizes);
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

  render() {
    return (
      <div>
        <Tree
          showLine
          showIcon
          checkable
          defaultExpandedKeys={['ns=0;i=85']}
          onSelect={this.onSelect}
        >
          {this.state.addressSpaceTree}
        </Tree>
      </div>
    );
  }
}
