import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Row, Col } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { log } from 'base/action.jsx';
import style from 'base/static/less/footer';

const mapStateToProps = (state) => ({
});

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
export default class Footer extends React.Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);
    this.social = ['github', 'twitter', 'linkedin', 'facebook'];
    this.state = {
      collapsed: false,
      socialLinks: [],
    };
    this.social.forEach((site) => {
      this.state.socialLinks.push(
        <Col xs={3} key={site}>
          <i className={`fa fa-${site} social-icons`} />
        </Col>,
      );
    });
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="footer-parent">
        <Navbar fluid className="navbar-default navbar-fixed-bottom">
          <div className="container-fluid">
            <Row>
              <Col xs={8} md={7} lg={6}>
                Logo and info here...maybe log?
              </Col>
              <Col xs={6} md={5} lg={4}>
                {this.state.socialLinks}
              </Col>
            </Row>
          </div>
        </Navbar>
      </div>
    );
  }
}
