import React from 'react';
import TodoApp from './src/screens/TodoApp';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {QueryClient, QueryClientProvider} from 'react-query';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TodoApp />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
