import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
    ShoppingCart,
    User,
    Search,
    Heart,
    Menu,
    X,
   } from 'lucide-react';

import logo from '../../assets/images/layoutHeader/logo.png';
import CartMenu from '../Cart/cartMenu';
import { useCart } from '../../context/cartContext';

import UserMenu from './userProfile';
import { motion } from 'framer-motion';

interface NavBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory
}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cart } = useCart();
    ;
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);



    const toggleCart = () => setIsCartOpen(!isCartOpen);
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-slate-950 shadow-md">
                <div className="mx-auto px-14 py-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="w-full flex justify-between items-center">
                        <img
                            src={logo}
                            alt="logo"
                            className="max-h-14 w-auto rounded-lg hidden md:block cursor-pointer"
                            onClick={() => {
                                window.location.href = '/';
                            }}
                        />

                        <button
                            className="md:hidden"
                            aria-label="Toggle mobile menu"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X color="white" /> : <Menu color="white" />}
                        </button>

                        <div
                            className={`w-full md:w-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 md:opacity-100'
                                }`}
                        >
                            <div className="relative w-full md:w-auto">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border rounded-full w-full md:w-64"
                                />
                                <Search className="absolute left-3 top-3 text-gray-400" />
                            </div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-6 py-2 border rounded-full w-full md:w-auto"
                            >
                                <option value="All">All Categories</option>
                                <option value="Outerwear">Outerwear</option>
                                <option value="Tops">Tops</option>
                                <option value="Bottoms">Bottoms</option>
                            </select>
                        </div>
                    </div>

                    <div
                        className={`w-full md:w-auto flex justify-between md:justify-end items-center space-x-4 ${mobileMenuOpen ? 'block' : 'hidden md:flex'
                            } mt-4 md:mt-0`}
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative md:pl-5"
                            onClick={toggleUserMenu}
                        >
                            <User color="white" />
                        </motion.button>

                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
                            <Heart color="red" />
                        </motion.button>

                        <button onClick={toggleCart} className="relative">
                            <ShoppingCart color="white" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                                {cart.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            <UserMenu isUserMenuOpen={isUserMenuOpen} toggleUserMenu={toggleUserMenu} />

            <CartMenu isCartOpen={isCartOpen} toggleCart={toggleCart} />

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