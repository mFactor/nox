import React from 'react';
import { connect } from 'react-redux';
import { log } from 'base/action.jsx';

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
      <div id="base-view">
        {this.props.children}
      </div>
    );
  }
}
