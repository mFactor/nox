import { EventEmitter } from 'events';
import { sysLog } from 'lib/log';
import UaSession from 'opcua/api/client/session';

export default class NoxClient {
  constructor() {
    this.eventBus = new EventEmitter();
    this.sessions = {};
  }

  /**
   * Create session and connect to endpoint
   */
  async connect(endpoint) {
    const session = new UaSession(this.eventBus);
    try {
      await session.connect(endpoint);
      await session.createSession();
      this.sessions[endpoint] = session;
    } catch (err) {
      sysLog.error(err);
    }
  }

  /**
   * Disconnect from endpoint
   */
  async disconnect(endpoint) {
    const session = this.sessions[endpoint];
    try {
      await session.deleteSession();
      await session.disconnect();
      delete this.sessions[endpoint];
    } catch (err) {
      sysLog.error(err);
    }
  }

  /**
   * Recursively browse a top level namespace
   */
  async crawlDomain(endpoint) {
    const session = this.sessions[endpoint];
    try {
      this.session[endpoint].addrSpace = await session.crawl('ObjectsFolder');
    } catch (err) {
      sysLog.error(err);
    }
  }

  /**
   * Monitor node or nodes
   */
  monitorNodes() {

  }

  unmonitorNodes() {

  }
}
