import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Layout() {
  return (
    <div className="w-screen h-screen overflow-hidden overflow-y-auto relative">
      <Navbar />
      <div className="w-full flex flex-col gap-6 relative p-4 lg:px-7">
        <Outlet />
      </div>
    </div>
  );
}
