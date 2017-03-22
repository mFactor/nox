class UaSubscription {
  constructor() {
    this.subscription = null;
    this.opts = {

    };

  }

  /**
   * Create subscription
   */
  createSubscription() {
    this.subscription = new opcua.ClientSubscription(this.session, {
      requestedPublishingInterval: 1000,
      requestedLifetimeCount: 10,
      requestedMaxKeepAliveCount: 2,
      maxNotificationsPerPublish: 10,
      publishingEnabled: true,
      priority: 10,
    });

    this.subscription.on('started', () => {
      console.log(`subscriptionId=${this.subscription.subscriptionId}`);
    }).on('keepalive', () => {
      console.log('keepalive');
    }).on('terminated', () => {
      callback();
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
  createMonitoredItems() {

  }

  /**
   * Create monitored items
   */
  deleteMonitoredItems() {

  }

}
