import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import Table from './components/Table/Table';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="wrapper">
        <Table />
      </div>
    </Provider>
  );
};

export default App;
