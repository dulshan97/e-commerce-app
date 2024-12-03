import React, { useState, } from 'react';
import { Outlet } from 'react-router-dom';
import {
    ShoppingCart,
    User,
    Search,
    Heart,
    Menu,
    X,
    
} from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../../assets/images/layoutHeader/logo.png';
import CartMenu from '../Cart/cartMenu';
import { CartItem } from '../../models/product';

const NavBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = React.useState<CartItem[]>([
        {
            id: '1',
            name: 'Classic Shirt',
            price: 39.99,
            description: 'A classic white shirt suitable for any occasion.',
            category: 'Tops', 
            image: '/path/to/image.jpg',
            quantity: 1, 
        },
    ]);

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const removeItem = (id: string) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
      };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };



    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-slate-950 shadow-md">
                <div className="mx-auto px-14 py-4 flex flex-col md:flex-row justify-between items-center">
                    {/* Logo and Mobile Menu Toggle */}
                    <div className="w-full flex justify-between items-center">
                        <img
                            src={logo}
                            alt="logo"
                            className="max-h-14 w-auto rounded-lg hidden md:block cursor-pointer"
                            onClick={() => {
                                window.location.href = '/';
                            }}
                        />

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden"
                            aria-label="Toggle mobile menu"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <motion.div initial={{ rotate: 0 }} animate={{ rotate: 180 }}>
                                    <X color="white" />
                                </motion.div>
                            ) : (
                                <motion.div initial={{ rotate: 180 }} animate={{ rotate: 0 }}>
                                    <Menu color="white" />
                                </motion.div>
                            )}
                        </button>

                        {/* Mobile Menu */}
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

                    {/* User and Icons - Responsive Layout */}
                    <div
                        className={`w-full md:w-auto flex justify-between md:justify-end items-center space-x-4 ${mobileMenuOpen ? 'block' : 'hidden md:flex '
                            } mt-4 md:mt-0`}
                    >
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative md:pl-5">
                            <User color="white" />
                        </motion.button>

                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
                            <Heart color="red" />
                        </motion.button>

                        <button onClick={toggleCart} className="relative">
                            <ShoppingCart color="white" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                                0
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Cart Off-Canvas */}
            <CartMenu
                isCartOpen={isCartOpen}
                toggleCart={toggleCart}
                cartItems={cartItems}
                removeItem={removeItem}
                getTotalPrice={getTotalPrice}
            />

            {/* Main Content */}
            <main className="flex-grow p-4">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-950 text-white p-4 text-center">
                © 2024 E-Commerce App. All rights reserved.
            </footer>
        </div>
    );
};

export default NavBar;
