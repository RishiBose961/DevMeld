import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface SwipeVerifyButtonProps {
  onVerified?: () => void;
}

const SwipeToVerify = ({ onVerified }: SwipeVerifyButtonProps) => {
  const [verified, setVerified] = useState(false);
  const [maxX, setMaxX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Dynamically calculate max swipe distance
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const width = container.offsetWidth;
      setMaxX(width - 60); // thumb width = 60px
    }

    const handleResize = () => {
      if (container) setMaxX(container.offsetWidth - 60);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDragEnd = (_: unknown, info: import("framer-motion").PanInfo) => {
    if (info.offset.x > maxX - 40) {
      setVerified(true);
      onVerified?.();
    } else {
      x.set(0);
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-md mt-10 h-[60px] bg-white border border-gray-300 rounded-lg shadow-sm flex items-center relative select-none overflow-hidden"
    >
      {/* Text */}
      <div className="flex-1 text-center text-gray-700 font-medium text-sm pl-5 z-10 truncate">
        {verified ? (
          <span className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" /> Verified
          </span>
        ) : (
          "Swipe to verify you're not a robot"
        )}
      </div>

      {/* Swipe handle */}
      {!verified && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[60px] bg-primary rounded-lg cursor-pointer flex items-center justify-center z-20 text-white font-bold"
          drag="x"
          dragConstraints={{ left: 0, right: maxX }}
          dragElastic={0.05}
          onDragEnd={handleDragEnd}
          style={{ x }}
        >
          ➜
        </motion.div>
      )}

      {/* Verified overlay */}
      {verified && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="absolute inset-0 bg-green-50 border border-green-400 rounded-lg"
        />
      )}
    </div>
  );
};

export default SwipeToVerify;
