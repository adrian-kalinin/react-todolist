import { Navigate, Route, Routes } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import Todos from './Todos';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/home" element={<h1>This is home page!</h1>} />
        <Route path="/about" element={<h1>This is about page!</h1>} />
        <Route path="/contact" element={<h1>This is contact page!</h1>} />
      </Route>
      <Route path="*" element={<h1 className="text-center mt-5">Oops! Page not found...</h1>} />
    </Routes>
  );
}

export default App;
