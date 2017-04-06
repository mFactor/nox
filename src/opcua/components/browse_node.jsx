import React from 'react';
import { connect } from 'react-redux';
import { Tree, Input } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { isServerActive } from 'lib/libastral';
import style from 'opcua/less/browse_node';
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
});

@withStyles(style)
@connect(mapStateToProps, mapDispatchToProps)
export default class BrowseNode extends React.Component {

  static propTypes = {
    opcua: React.PropTypes.object.isRequired,
  }

  constructor() {
    super();
    this.state = {
      endpoint: null,
      browseTree: null,
    };
    this.tmpBuilder = [];
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    const endpoint = isServerActive(nextProps.opcua);

    let browseTree = null;
    if (endpoint) {
      if (nextProps.opcua[endpoint].browseResult) {
        const innerTree = this.traverseBrowse(nextProps.opcua[endpoint].browseResult);
        browseTree = (
          <Tree
            defaultExpandAll
          >
            {innerTree}
          </Tree>
        );
      }
    }
    this.setState({
      browseTree,
    });
  }

  /**
   * Traverse browse object, build UI tree
   */
  traverseBrowse = (browseResult) => {
    const tmpNodes = [];
    if (browseResult) {
      Object.keys(browseResult).forEach((iter) => {
        const title = `${iter}: ${browseResult[iter]}`;
        if (typeof browseResult[iter] === 'object') {
          const nextNodes = this.traverseBrowse(browseResult[iter]);
          if (nextNodes.length > 0) {
            tmpNodes.push(
              <TreeNode title={iter} key={iter}>
                {nextNodes}
              </TreeNode>,
            );
          } else {
            tmpNodes.push(
              <TreeNode title={title} key={iter} />,
            );
          }
        } else {
          // Bottom of tree
          tmpNodes.push(
            <TreeNode title={title} key={iter} />,
          );
        }
      });
    }
    return tmpNodes;
  }

  render() {
    return (
      <div>
        {this.state.browseTree}
      </div>
    );
  }
}
