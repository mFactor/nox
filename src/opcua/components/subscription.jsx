import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import * as Table from 'reactabular-table';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { log } from 'base/action.jsx';
import { isServerActive } from 'lib/libastral';
import * as nox from 'opcua/action.jsx';
import style from 'opcua/static/less/subscription';
import moreStyle from 'lib/static/pure/table';

const mapStateToProps = (state) => ({
  opcua: state.opcua,
});

const mapDispatchToProps = (dispatch) => ({
  log: (msg, level) => {
    dispatch(log(msg, level));
  },
  monitor: (endpoint, nodeId) => {
    dispatch(nox.monitor(endpoint, nodeId));
  },
});

/**
 * Base (or root) component for application
 */
@withStyles(style)
@withStyles(moreStyle)
@connect(mapStateToProps, mapDispatchToProps)
export default class Subscription extends React.Component {
  static propTypes = {
    // log: React.PropTypes.func.isRequired,
    // opcua: React.PropTypes.object.isRequired,
    monitor: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.state.columns = [
      {
        property: 'name',
        header: {
          label: 'Name',
          transforms: [
            (label) => ({
              onClick: () => alert(`clicked ${label}`),
            }),
          ],
        },
      },
      {
        property: 'tools',
        header: {
          label: 'Active',
          transforms: [
            (label) => ({
              onClick: () => alert(`clicked ${label}`),
            }),
          ],
        },
        cell: {
          formatters: [
            tools => tools.hammer ? 'Hammertime' : 'nope',
          ],
        },
      },
      {
        property: 'country',
        header: {
          label: 'Country',
          transforms: [
            label => ({
              onClick: () => alert(`clicked ${label}`),
            }),
          ],
        },
        cell: {
          formatters: [
            country => 'USA',
          ],
        },
      },
    ];

    this.state.rows = [];

    /*
    this.state.rows = [
      {
        id: 100,
        name: 'John',
        tools: {
          hammer: true,
        },
        country: 'fi',
      },
      {
        id: 101,
        name: 'Jack',
        tools: {
          hammer: false,
        },
        country: 'dk',
      },
    ];
    */
  }

  render() {
    return (
      <div
        className="subscription"
        onDragEnter={(event) => { event.preventDefault(); }}
        onDragOver={(event) => { event.preventDefault(); }}
        onDrop={() => { console.log('test'); }}
      >
        <Table.Provider
          className="pure-table pure-table-striped"
          columns={this.state.columns}
        >
          <Table.Header />
          <Table.Body rows={this.state.rows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
}
