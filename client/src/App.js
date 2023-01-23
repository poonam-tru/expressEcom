import React from "react";
import NewRoutes from "./Routes/NewRoutes";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Provider store={store}>
      <NewRoutes />
    </Provider>
  );
}

export default App;
