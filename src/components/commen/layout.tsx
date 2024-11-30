import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">E-Commerce App</h1>
                <div className="flex gap-4">
                    <NavLink
                        to="/"
                        className={({ isActive }: { isActive: boolean }) =>
                            `hover:underline ${isActive ? 'font-bold' : ''}`
                        }
                    >
                        Products
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
            </nav>

            {/* Main Content */}
            <main className="flex-grow p-4">
                <Outlet /> 
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 text-center">
                © 2024 E-Commerce App. All rights reserved.
            </footer>
        </div>
    );
};

export default Layout;
