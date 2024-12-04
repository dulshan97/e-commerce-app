
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '../../routes/RouteName';
import { UserDetails } from '../../models/user';
import { SignupSchema } from '../../Utils/validations/signUpValidationSchema';
import SignupErrorMessage from './signUpErrorMsg';
import SignupForm from './signUpForm';
import { Shirt, ShoppingCart } from 'lucide-react';
import { generateId } from '../../Utils/idGenetrator';


const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [signupError, setSignupError] = useState('');

    const handleSignup = (values: {
        id:string;
        username: string;
        email: string;
        password: string
    }) => {
        try {
           
            const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

            
            const existingUser = users.find((u: UserDetails) => u.email === values.email);
            if (existingUser) {
                setSignupError('Email already registered');
                return;
            }

            
            const newUser: UserDetails = {
                name: values.username,
                id:generateId(),
                email: values.email,
                password: values.password,
                registeredAt: new Date().toISOString()
            };

           
            users.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(users));

           
            localStorage.setItem('currentUser', JSON.stringify({
                ...newUser,
                isAuthenticated: true
            }));

            navigate(RouteName.PRODUCTLIST);
        } catch (error) {
            setSignupError('Signup failed');
            console.error('Signup failed', error);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden 
                bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4">
            
            

            {/* Floating Clothing Elements */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 0.2, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute top-20 left-10 transform rotate-12 opacity-20"
            >
                <Shirt />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 0.2, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute top-64 right-20 transform rotate-12 opacity-20"
            >
                <Shirt />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 0.2, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute bottom-20 right-10 transform -rotate-12 opacity-20"
            >
                 <ShoppingCart />

            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 0.2, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute top-520 right-64 transform -rotate-12 opacity-20"
            >
                 <ShoppingCart />

            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 0.2, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute top-520 left-64 transform -rotate-12 opacity-20"
            >
                 <ShoppingCart />

            </motion.div>

            
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-pink-100/50"
            >
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-pink-500 to-purple-600">
                        Create Your Account
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                        Join our fashion community
                    </p>
                </div>

                

                <SignupErrorMessage error={signupError} />

                <SignupForm
                    initialValues={{
                        id:"",
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={handleSignup}
                />

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already a member?{' '}
                        <button
                            onClick={() => navigate(RouteName.LOGIN)}
                            className="text-pink-600 hover:underline font-medium"
                        >
                            Log In
                        </button>
                    </p>
                    
                </div>
            </motion.div>
            
        </div>
        
    );
};

export default Signup;