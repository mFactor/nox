import React from 'react';
import { Tree, Input } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from 'opcua/less/address_space';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

@withStyles(style)
export default class AddressSpace extends React.Component {

  constructor() {
    super();
    this.state = {

    };
  }

  onSelect = (selectedKeys, info) => {
  }


  render() {
    return (
      <Tree
        defaultExpandAll
        onSelect={this.onSelect}
      >
        <TreeNode title="parent 1" key="0-0">
          <TreeNode title="parent 1-0" key="0-0-0">
            <TreeNode title="leaf" key="0-0-0-0" />
            <TreeNode title="leaf" key="0-0-0-1" />
          </TreeNode>
          <TreeNode title="parent 1-1" key="0-0-1">
            <TreeNode title="leaf" key="0-0-1-0" />
          </TreeNode>
        </TreeNode>
      </Tree>
    );
  }
}
