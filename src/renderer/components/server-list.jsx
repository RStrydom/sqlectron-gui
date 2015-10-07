import React, { Component, PropTypes } from 'react';
import ServerListItem from './server-list-item.jsx';
import LoadingPage from './loading.jsx';
import { Link } from 'react-router';


export default class ServerList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      serverToDrop: {}
    }
  }

  static propTypes = {
    servers: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.loadServers();
  }

  onItemClick(server) {
    this.setState({ serverToDrop: server });
  }

  onAddClick(server) {
    const { actions } = this.props;
    actions.openAddServers();
  }

  render() {
    const { servers, actions } = this.props;
    const { serverToDrop } = this.state;

    return servers.length > 0 ?
      <div>
        <button className="ui button" onClick={::this.onAddClick}>
          Add
        </button>
        <ul>
          {servers.map((server,i) =>
            <ServerListItem
              onClick={::this.onItemClick}
              key={i}
              server={server} />
          )}
        </ul>
      </div>
    : <LoadingPage />;
  }
};
