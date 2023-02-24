import './App.css';
import 'antd/dist/reset.css'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Space } from 'antd';
import Records from './components/pages/Records';
import LearnMore from './components/pages/LearnMore';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return(
    <Space
      direction='vertical'
      size='middle'
      style={{ display: 'flex' }}
    > 
      <BrowserRouter>
        <ApolloProvider client={client}>
          <div className='App'>
            <Routes>
              <Route path='/' element={<Records/>} />
              <Route path='/learn-more/:id' element={<LearnMore/>} />
            </Routes>
          </div>
        </ApolloProvider>
      </BrowserRouter>
    </Space>
  )
}

export default App