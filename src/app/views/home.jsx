import React from 'react';
import { AppBar } from 'react-toolbox/lib/app_bar/AppBar';
// import Navigation from 'react-toolbox/lib/navigation';
// import Link from 'react-toolbox/lib/Link';
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
        Hey
      </div>
    );
  }
}
