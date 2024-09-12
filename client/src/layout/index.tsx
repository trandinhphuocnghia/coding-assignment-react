import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Layout() {
  return (
    <div className="w-screen relative">
      <Navbar />
      <div className="w-full p-4 lg:p-7">
        <Outlet />
      </div>
    </div>
  );
}
