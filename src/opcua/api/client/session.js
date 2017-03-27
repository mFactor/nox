import Ua from 'node-opcua';
import BrowseService from 'node-opcua/lib/services/browse_service';

/**
 * Internal interface to Node OPCUA SDK
 */
export default class UaSession {

  constructor(eventBus) {
    this.opts = {
      keepSessionAlive: true,
    };
    this.client = new Ua.OPCUAClient(this.opts);
    this.crawler = null;
    this.eventBus = eventBus;
  }

  /**
   * Connect to UaSession
   */
  connect(endpoint) {
    return new Promise((resolve, reject) => {
      this.endpoint = endpoint;
      this.client.connect(endpoint, (err) => {
        if (err) {
          reject(`Error connecting to OPC UA endpoint - ${this.endpoint}`);
        }
        resolve(`Connected to ${this.endpoint}`);
      });
    });
  }

  /**
   * Disconnect from UaSession
   */
  disconnect() {
    return new Promise((resolve, reject) => {
      this.client.disconnect((err) => {
        if (err) {
          reject(`Error disconnecting from OPC UA endpoint - ${this.endpoint}`);
        }
        resolve(`Disconnect from ${this.endpoint}`);
      });
    });
  }

  /**
   * Create Session to Server
   */
  createSession() {
    return new Promise((resolve, reject) => {
      this.client.createSession((err, session) => {
        if (err) {
          reject(`Error create new OPC UA session - ${this.endpoint}`);
        }
        this.session = session;
        this.crawler = new Ua.NodeCrawler(this.session);
        resolve(`OPC UA session created - ${this.endpoint}`);
      });
    });
  }

  /**
   * Browse
   */
  deleteSession() {
    return new Promise((resolve, reject) => {
      this.session.close((err) => {
        if (err) {
          reject(`Error closing OPC UA session - ${this.endpoint}`);
        }
        this.session = null;
        this.crawler = null;
        resolve(`OPC UA session closed - ${this.endpoint}`);
      });
    });
  }

  /**
   * Browse address space
   * Return JSON of address space references
   * If level is null, returns all forward references
   */
  browse(browseDescription) {
    return new Promise((resolve, reject) => {
      this.session.browse(browseDescription, (err, browseResults) => {
        if (err) {
          reject(`Browse failed`);
        }
        const next = [];
        browseResults[0].references.forEach((ref) => {
          next.push(ref.typeDefinition.identiferType.toString());
        });
        resolve(next);
      });
    });
  }

  /**
   * Browse address space
   * Return JSON of address space references
   * If level is null, returns all forward references
   */
  crawl(namespace) {
    return new Promise((resolve, reject) => {
      this.crawler.read(namespace, (err, obj) => {
        if (err) {
          reject(err);
        }
        resolve(obj);
      });
    });
  }

  /**
   * Method call
   */
  call() {
    return new Promise((resolve, reject) => {
      this.session.call([], (err, callResponse) => {
        if (err) {
          reject(`Method call failed`);
        }
        resolve(callResponse);
      });
    });
  }
}
