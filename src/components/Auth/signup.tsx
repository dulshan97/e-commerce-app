import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '../../routes/RouteName';
import { UserDetails } from '../../models/user';

// Validation Schema
const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required')
});

const Signup: React.FC = () => {
    const navigate = useNavigate();

    const handleSignup = (values: {
        username: string;
        email: string;
        password: string
    }) => {
        try {
            // Store user data in local storage
            const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

            // Check if email already exists
            const existingUser = users.find((u: UserDetails) => u.email === values.email);
            if (existingUser) {
                alert('Email already registered');
                return;
            }

            // Create new user object
            const newUser: UserDetails = {
                name: values.username,
                email: values.email,
                password: values.password, // In a real app, hash this!
                registeredAt: new Date().toISOString()
            };

            // Add to users and save
            users.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(users));

            // Set current user
            localStorage.setItem('currentUser', JSON.stringify({
                ...newUser,
                isAuthenticated: true
            }));

            navigate(RouteName.ROOT);
        } catch (error) {
            console.error('Signup failed', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-green-800">
                    Create Account
                </h2>

                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={handleSignup}
                >
                    {({ errors, touched }) => (
                        <Form className="space-y-6">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <Field
                                    type="text"
                                    name="username"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                    ${errors.username && touched.username
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-green-500'}`}
                                />
                                <ErrorMessage
                                    name="username"
                                    component="p"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                    ${errors.email && touched.email
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-green-500'}`}
                                />
                                <ErrorMessage
                                    name="email"
                                    component="p"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                    ${errors.password && touched.password
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-green-500'}`}
                                />
                                <ErrorMessage
                                    name="password"
                                    component="p"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                    ${errors.confirmPassword && touched.confirmPassword
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-green-500'}`}
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="p"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="w-full bg-green-600 text-white py-3 rounded-lg 
                  hover:bg-green-700 transition duration-300 font-semibold"
                            >
                                Sign Up
                            </motion.button>
                        </Form>
                    )}
                </Formik>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <button
                            onClick={() => navigate(RouteName.LOGIN)}
                            className="text-green-600 hover:underline font-medium"
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