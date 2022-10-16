import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function BaseLayout() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container mt-3">
        <Outlet />
      </main>
    </>
  );
}

export default BaseLayout;
