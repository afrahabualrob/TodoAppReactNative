import React from 'react';
import TodoApp from './src/components/TodoApp';
import {Provider} from 'react-redux';
import store from './src/store/store';
import FeatchedData from './src/pages/FeatchedData';
import { QueryClient, QueryClientProvider } from 'react-query';

const App = () => {
  const queryClient = new QueryClient();

  return (
    // <Provider store={store}>
    //   <FeatchedData />
    // </Provider>
    <QueryClientProvider client={queryClient}>
    <FeatchedData />
  </QueryClientProvider>
  );
};

export default App;
