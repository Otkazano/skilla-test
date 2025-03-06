import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CallList from "./components/CallList/CallList";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
      <h1>Список звонков 22</h1>
      <CallList />
    </div>
    </Provider>
  );
};

export default App;