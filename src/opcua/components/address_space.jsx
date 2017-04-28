import React from 'react';
import { connect } from 'react-redux';
import Tree, { TreeNode } from 'rc-tree';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { isServerConnected } from 'lib/libastral';
import style from 'opcua/static/less/address_space';
import { log } from 'base/action.jsx';
import * as nox from 'opcua/action.jsx';

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
  monitor: (endpoint, nodeId) => {
    dispatch(nox.monitor(endpoint, nodeId));
  },
  unmonitor: (endpoint, nodeId) => {
    dispatch(nox.unmonitor(endpoint, nodeId));
  },
});

@withStyles(style)
@connect(mapStateToProps, mapDispatchToProps)
export default class AddressSpace extends React.Component {

  static propTypes = {
    opcua: React.PropTypes.object.isRequired,
    browse: React.PropTypes.func.isRequired,
    monitor: React.PropTypes.func.isRequired,
    unmonitor: React.PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.state = {
      endpoint: null,
      addressSpaceTree: [],
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
    }
    this.setState({
      endpoint,
      addressSpaceTree,
    });
  }

  /**
   * Monitor selected node on check, or unmonitor
   */
  onCheckToggle = (checkedKeys, event) => {
    if (event.checked === true) {
      this.props.monitor(this.state.endpoint, event.node.props.eventKey);
      return;
    }
    this.props.unmonitor(this.state.endpoint, event.node.props.eventKey);
  }

  /**
   * Browse selected node on click
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
          <TreeNode title={iter.browseName} key={iter.nodeId} className="test" />,
        );
      }
    });
    return tmpNodes;
  }

  render() {
    /*
       return (
       <div>
       <Tree
       showLine
       showIcon
       checkable
       checkStrictly
       defaultExpandedKeys={['ns=0;i=85']}
       onSelect={this.onSelect}
       onCheck={this.onCheckToggle}
       >
       {this.state.addressSpaceTree}
       </Tree>
       </div>
       );
     */
    return (
      <div style={{ zIndex: "1050" }}>
        <Tree
          defaultExpandAll
          className="address-space"
          onSelect={this.onSelect}
          onCheck={this.onCheckToggle}
        >
          {this.state.addressSpaceTree}
        </Tree>
      </div>
    );
  }
}
