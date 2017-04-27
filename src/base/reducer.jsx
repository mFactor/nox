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
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        drawer: {
          collapsed: !state.drawer.collapsed,
        },
      };
    default:
      return state;
  }
};

export default base;
