import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Layout() {
  return (
    <div className="w-full bg-[#FFF] flex flex-col relative">
      <Navbar />
      <Outlet />
    </div>
  );
}
