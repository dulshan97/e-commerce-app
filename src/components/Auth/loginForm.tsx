// src/components/Login/LoginForm.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { motion } from 'framer-motion';

import { LoginSchema } from '../../Utils/validations/loginvalidation';

interface LoginFormProps {
  initialValues: { email: string; password: string };
  validationSchema: typeof LoginSchema;
  onSubmit: (values: { email: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  initialValues,
  validationSchema,
  onSubmit
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className="space-y-6">
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
                  : 'border-gray-300 focus:ring-blue-500'}`}
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
                  : 'border-gray-300 focus:ring-blue-500'}`}
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <motion.button
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            type="submit"
            className="w-full bg-blue-950 text-white py-3 rounded-lg 
              hover:bg-blue-900 transition duration-300 font-semibold"
          >
            Sign In
          </motion.button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;