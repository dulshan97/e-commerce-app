import { AnimatePresence, motion } from "framer-motion";
import { LogOut, UserCircle, X } from "lucide-react";

interface UserMenuProps {
    isUserMenuOpen: boolean;
    toggleUserMenu: () => void;
}

import React from 'react'
import { RouteName } from "../../routes/RouteName";
import { useNavigate } from "react-router-dom";

const UserMenu: React.FC<UserMenuProps> = ({ isUserMenuOpen, toggleUserMenu }) => {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem('currentUser');

        // localStorage.removeItem('userToken');
        navigate(RouteName.LOGIN);
    };

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    return (
        <AnimatePresence>
            {isUserMenuOpen && (
                <>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-40"
                        onClick={toggleUserMenu}
                    />

                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed right-0 top-0 w-96 h-full bg-white shadow-lg p-6 overflow-y-auto z-50"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Profile</h2>
                            <motion.button whileHover={{ rotate: 90 }} onClick={toggleUserMenu} >
                                <X />
                            </motion.button>
                        </div>

                        {currentUser ? (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <UserCircle size={50} className="text-gray-500" />
                                    <div>
                                        <p className="font-semibold">{currentUser.username}</p>
                                        <p className="text-sm text-gray-500">{currentUser.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 rounded-full">
                                    <motion.button
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center space-x-2 
                                    bg-blue-950 text-white py-2 rounded-md hover:bg-blue-900 transition"
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <LogOut size={20} />
                                        <span>Logout</span>
                                    </motion.button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <button
                                    onClick={() => {
                                        navigate(RouteName.LOGIN);
                                        toggleUserMenu();
                                    }}
                                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => {
                                        navigate(RouteName.SIGNUP);
                                        toggleUserMenu();
                                    }}
                                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default UserMenu

