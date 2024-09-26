import { FC } from 'react';
import { Footer, NavBar, Transactions } from './components';

const App: FC = () => {
  return (
    <>
      <NavBar />
      <Transactions />
      <Footer />
    </>
  );
};

export default App;
