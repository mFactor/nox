import Ua from 'node-opcua';

export default class UaSubscription {
  constructor(endpoint, session, eventBus) {
    this.endpoint = endpoint;
    this.session = session;
    this.eventBus = eventBus;
    this.opts = {
      requestedPublishingInterval: 100,
      requestedLifetimeCount: 10,
      requestedMaxKeepAliveCount: 2,
      maxNotificationsPerPublish: 10,
      publishingEnabled: true,
      priority: 10,
    };
    this.subscription = new Ua.ClientSubscription(this.session, this.opts);
    this.id = this.subscription.subscriptionId;

    // Subscription event bus
    this.subscription.on('started', () => {
      this.eventHub.emit(`/subscription`, {
        id: this.id,
        status: true,
        msg: 'Subscription started',
        data: '',
      });
    }).on('keepalive', () => {
      this.eventHub.emit(`/subscription/heartbeat`, {
        status: true,
      });
    }).on('terminated', () => {
      this.eventHub.emit(`/endpoint/subscription`, {
        status: '',
        msg: '',
        data: '',
      });
    });
  }

  /**
   * Browse
   */
  deleteSubscription() {
    return new Promise((resolve, reject) => {
      this.subscription.terminate((err) => {
        if (err) {
          reject(`Subscription deletion failed`);
        }
        resolve(`Subscription deleted`);
      });
    });
  }

  /**
   * Create monitored items
   */
  monitor(nodeId) {
    return new Promise((resolve, reject) => {
      if (!nodeId) {
        reject(`No nodeId to monitor`);
      }
      const monitoredItem = this.subscription.monitor({
        nodeId: Ua.resolveNodeId(nodeId),
        attributeId: Ua.AttributeIds.Value,
      }, {
        samplingInterval: 100,
        discardOldest: true,
        queueSize: 10,
      }, Ua.read_service.TimestampsToReturn.Both);

      // handle data change
      monitoredItem.on('changed', (dataValue) => {

      });
      resolve(`Monitoring done`);
    });
  }

  /**
   * Delete monitored items
   * This functionality is not yet implemented in node-opcua
   * In talks with @erossignon about a patch
   * For now call deleteSubscription
   */
  deleteMonitoredItem(nodeId) {
    return false;
  }

}
