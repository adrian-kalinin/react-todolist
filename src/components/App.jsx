import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Todos from './Todos';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Todos />} />
      </Route>
      <Route path="*" element={<h1 className="text-center mt-5">Oops! Page not found...</h1>} />
    </Routes>
  );
}

export default App;
