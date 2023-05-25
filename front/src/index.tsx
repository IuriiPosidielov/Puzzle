import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Auth from './features/auth/Auth';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

function External() {
  window.location.href = 'https://google.com';
  return null;
}

const container = document.getElementById('root')!;
const root = createRoot(container);
const persistor = persistStore(store);
const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
	},
	{
		path: "/login",
		element: <Auth />,
	},
	{
		path: "/admin",
		element: <External />,
	},
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
	<PersistGate loading={null} persistor={persistor}>
		<RouterProvider router={router} />
	</PersistGate>
    </Provider>
  </React.StrictMode>
);

