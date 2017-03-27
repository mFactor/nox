import base from 'base/saga.jsx';
import opcua from 'opcua/saga.jsx';

function* rootSaga() {
  yield [
    base(),
    opcua(),
  ];
}

export default rootSaga;
