import React from 'react';
import { Button } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from 'app/less/home';

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
      <div id="home-view">
        <Button type="primary">That was ugly</Button>
      </div>
    );
  }
}
