import { Component, PropTypes, Children } from 'react';

/**
 * Isomorphic hot-loading CSS (LESS), paired with 'isomorphic-style-loader'
 */
export default class IsoStyle extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    onInsertCss: PropTypes.func.isRequired,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
  };

  getChildContext() {
    return { insertCss: this.props.onInsertCss };
  }

  render() {
    return Children.only(this.props.children);
  }
}
