import React from "react";
import "./App.css";
import Routes from "./Routes";
import { Provider } from "react-redux";
import { Store } from "redux";
import configureStore from "./reducer/Store";
import { IApplicationState } from "./reducer/Store";

interface IProps {
  store: Store<IApplicationState>;
}
const store = configureStore();

const Root: React.FC<IProps> = (props) => {
  return (
    <Provider store={props.store}>
      <Routes />
    </Provider>
  );
};

function App() {
  return (
    <div className="App">
      <Root store={store} />
    </div>
  );
}

export default App;
