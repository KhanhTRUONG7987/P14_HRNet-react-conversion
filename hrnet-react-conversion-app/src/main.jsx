import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ModalProvider } from "react-modal-dk2/dist/lib/ModalContext/ModalContext";
import store from "./store/index";
import App from "./App";

const root = document.getElementById("root");
const rootContainer = createRoot(root);
rootContainer.render(
  <Provider store={store}>
    <ModalProvider>
      <App />
    </ModalProvider>
  </Provider>
);
