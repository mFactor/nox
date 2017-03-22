/**
 * Application reducers
 */
const base = (state = {}, action) => {
  switch (action.type) {
    case 'STATUS':
      return {
        ...state,
        status: action.status,
      };
    default:
      return state;
  }
};

export default base;
