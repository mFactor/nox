import { sysLog } from 'lib/log';
import UaSession from 'opcua/api/client/session';

export default class NoxClient {
  constructor(eventBus) {
    if (!eventBus) {
      throw new Error('An event emitter must be passed to a new client instance');
    }
    this.eventBus = eventBus;
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
      return {
        status: true,
        msg: `Connected - ${endpoint}`,
        data: null,
      };
    } catch (err) {
      sysLog.error(err);
      return {
        status: false,
        msg: `Error connecting - ${endpoint}`,
        err,
      };
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
      return {
        status: true,
        msg: `Disconnected - ${endpoint}`,
        data: null,
      };
    } catch (err) {
      return {
        status: false,
        msg: `Error disconnecting - ${endpoint}`,
        err,
      };
    }
  }

  /**
   * Recursively browse a top level namespace
   */
  async crawlDomain(endpoint) {
    const session = this.sessions[endpoint];
    try {
      this.sessions[endpoint].addrSpace = await session.crawl('ObjectsFolder');
      return {
        status: true,
        msg: `Crawl successful - ${endpoint}`,
        data: this.sessions[endpoint].addrSpace,
      };
    } catch (err) {
      return {
        status: false,
        msg: `Error crawling - ${endpoint}`,
        err,
      };
    }
  }

  /**
   * Recursively browse a top level namespace
   */
  async browse(endpoint, nodeId) {
    const session = this.sessions[endpoint];
    this.sessions[endpoint].browseResult = {};
    try {
      const browseResult = await session.browse(nodeId);
      const readResult = await session.read(nodeId);
      this.sessions[endpoint].browseResult = Object.assign({}, browseResult, readResult);
      return {
        status: true,
        msg: `Browse successful - ${nodeId} - ${endpoint}`,
        data: this.sessions[endpoint].browseResult,
      };
    } catch (err) {
      return {
        status: false,
        msg: `Error browsing - ${nodeId} - ${endpoint}`,
        err,
      };
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
