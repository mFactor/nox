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
          addressSpace: action.addressSpace,
          browseResults: null,
          subscriptions: {},
          msg: action.msg,
        },
      };
    default:
      return state;
  }
};

export default opcua;
