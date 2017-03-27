/**
 * OPC UA reducers
 */
const opcua = (state = {}, action) => {
  switch (action.type) {
    case 'CONNECT_SUCCESS':
      return {
        ...state,
        [action.endpoint]: {
          isConnected: true,
          addressSpace: action.addressSpace,
          browseResults: null,
          subscriptions: {},
          msg: 'Connect Succeeded',
        },
      };
    case 'CONNECT_FAILURE':
      console.log('fail');
      return {
        ...state,
        [action.endpoint]: {
          isConnected: false,
          addressSpace: null,
          browseResults: null,
          subscriptions: {},
          msg: 'Connect Failed',
        },
      };
    default:
      return state;
  }
};

export default opcua;
