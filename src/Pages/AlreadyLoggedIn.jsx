import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

const AlreadyLoggedIn = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-500 to-purple-600">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12 }}
        className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center"
      >
        <motion.h1
          className="text-3xl font-bold text-indigo-600 mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          You're Already Logged In!
        </motion.h1>

        <motion.p
          className="text-gray-600 mb-6 text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Head back to the homepage and start exploring.
        </motion.p>

        <motion.button
          onClick={() => navigate('/')}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-lg font-semibold py-2 transition-colors duration-300"
          whileTap={{ scale: 0.95 }}
        >
          Go to Homepage
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AlreadyLoggedIn;
