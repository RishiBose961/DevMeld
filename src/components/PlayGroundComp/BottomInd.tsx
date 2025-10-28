import { motion, AnimatePresence } from "framer-motion";

const BottomInd = ({ usernames }: { usernames: string[] }) => {
  const isTyping = usernames && usernames.length > 0;

  return (
    <AnimatePresence>
      {isTyping && (
        <motion.div
          key="typing-indicator"
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", stiffness: 250, damping: 15 },
          }}
          exit={{
            opacity: 0,
            scale: [1, 1.1, 0],
            y: [0, -10, 40],
            rotate: [0, 10, -15],
            transition: {
              duration: 0.6,
              ease: "easeInOut",
            },
          }}
          className="fixed z-50 w-fit h-14 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 border border-blue-400 rounded-full bottom-6 left-1/2 shadow-xl flex flex-col items-center justify-center px-4"
        >
          <motion.p
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.9, 1.05, 1] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-sm font-medium text-white text-center"
          >
            {`${usernames} ${usernames.includes(",") ? "are" : "is"} typing`}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BottomInd;
