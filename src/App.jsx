import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ErrorPage } from './components/SharedComponents/ErrorPage';
import { Spinner } from './components/SharedComponents/Spinner';

const router = createBrowserRouter([
  {
    async lazy() {
      const { Layout: Component, loader } = await import(
        './components/Layout/Layout'
      );

      return { Component, loader };
    },
    ErrorBoundary: ErrorPage,
    id: 'layoutLoader',
    children: [
      {
        path: '/',
        async lazy() {
          const { Contacts: Component, loader } = await import(
            './components/Contacts/Contacts'
          );

          return { Component, loader };
        },
      },
      {
        path: '/contacts/add',
        async lazy() {
          const { AddContact: Component, action } = await import(
            './components/AddContact/AddContact'
          );

          return { Component, action };
        },
      },
      {
        path: '/contacts/:contactId/edit',
        async lazy() {
          const {
            EditContact: Component,
            loader,
            action,
          } = await import('./components/EditContact/EditContact');

          return { Component, loader, action };
        },
      },
      {
        path: '/contacts/:contactId',
        async lazy() {
          const { ViewContact: Component, loader } = await import(
            './components/ViewContact/ViewContact'
          );

          return { Component, loader };
        },
      },
      {
        path: '/contacts/:contactId/remove',
        async lazy() {
          const { action } = await import(
            './components/removeContact/removeContact'
          );

          return { action };
        },
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} fallbackElement={<Spinner />} />;
};
