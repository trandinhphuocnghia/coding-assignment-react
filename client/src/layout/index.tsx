import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Layout() {
  return (
    <div className="w-screen h-full flex flex-col overflow-hidden relative">
      <Navbar />
      <Outlet />
    </div>
  );
}
