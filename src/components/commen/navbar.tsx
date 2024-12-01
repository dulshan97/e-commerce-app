import { NavLink, Outlet } from 'react-router-dom';
import logo from '../../assets/images/layoutHeader/logo.png'
import { RiCloseLargeLine } from "react-icons/ri";
import { FaCog } from 'react-icons/fa';
import { useState } from 'react';

const NavBar = () => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    return (
        <div className='min-h-screen flex flex-col'>
            <nav className="bg-gray-950 text-white p-4 flex justify-between items-center shadow-md">

                <img
                    src={logo}
                    alt="logo"
                    className="hidden custom-600:block max-h-14 w-auto rounded-lg"
                />

                <div className="flex gap-4">
                    <NavLink
                        to="/"
                        className={({ isActive }: { isActive: boolean }) =>
                            `hover:underline ${isActive ? 'font-bold' : ''}`
                        }
                    >
                        <span>Products</span> 
                    </NavLink>
                    <NavLink
                        to="/cart"
                        className={({ isActive }: { isActive: boolean }) =>
                            `hover:underline ${isActive ? 'font-bold' : ''}`
                        }
                    >
                        Cart
                    </NavLink>
                </div>

                <div className="flex items-center gap-4 ">
                    <img
                        src="https://via.placeholder.com/40"
                        alt="User Profile"
                        className="max-h-14 w-auto sm:h-24 md:h-32 rounded-full"
                    />
                    <span className="font-medium ">John Doe</span>
                    <div className="hover:text-gray-300 cursor-pointer" onClick={togglePanel}>
                        <FaCog size={24} />
                    </div>
                </div>
            </nav>

            {/* Side Panel */}
            <div
                className={`fixed top-0 right-0 h-full sm:w-1/6 md:2/6 w-full bg-white shadow-lg transform ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out`}
            >

                <button
                    onClick={togglePanel}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                    <RiCloseLargeLine />
                </button>


                <div className="p-4">
                    <h2 className="text-lg font-bold mb-10">Settings</h2>
                    <ul className="space-y-4">
                        <li>
                            <a href="#" className="text-blue-600 hover:underline">
                                Profile
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-blue-600 hover:underline">
                                Notifications
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-blue-600 hover:underline">
                                Privacy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-blue-600 hover:underline">
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <main className="flex-grow p-4">
                <Outlet />
            </main>


            <footer className="bg-gray-950 text-white p-4 text-center">
                © 2024 E-Commerce App. All rights reserved.
            </footer>
        </div>


    );
};

export default NavBar;
