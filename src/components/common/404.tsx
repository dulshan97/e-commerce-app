import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '../../routes/RouteName';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
          404 - Page Not Found
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate(RouteName.LOGIN)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200"
          >
            Go to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PageNotFound;
