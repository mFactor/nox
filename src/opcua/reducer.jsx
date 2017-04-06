/**
 * OPC UA reducers
 * @param {object} state - Redux state object
 */
const opcua = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_SESSION':
      return {
        ...state,
        [action.endpoint]: {
          isConnected: action.status,
          isActive: action.active,
          addressSpace: [action.addressSpace],
          browseResult: null,
          subscriptions: {},
          msg: action.msg,
        },
      };
    case 'UPDATE_BROWSE': {
      const session = {
        ...state,
      };
      session[action.endpoint].browseResult = action.browseResult;
      return session;
    }
    case 'UPDATE_ACTIVE': {
      const session = {
        ...state,
      };
      session[action.endpoint].isActive = action.active;
      return session;
    }
    default:
      return state;
  }
};

export default opcua;
