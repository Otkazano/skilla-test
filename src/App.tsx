import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import Tabel from './components/Tabel/Tabel';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="wrapper">
        <Tabel />
      </div>
    </Provider>
  );
};

export default App;
