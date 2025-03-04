"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { DiceLineProps } from "@/types/types";

const DiceLine: React.FC<DiceLineProps> = ({
  result,
  isRolling,
  setIsRolling,
}: DiceLineProps) => {
  const pointerControls = useAnimation();
  const positions = [0, 180, 380, 580, 780, 952];

  const isRollingRef = useRef(isRolling);
  isRollingRef.current = isRolling;

  const animatePointer = async () => {
    while (isRollingRef.current) {
      const randomPosition =
        positions[Math.floor(Math.random() * positions.length)];
      await pointerControls.start({
        x: `${randomPosition}px`,
        transition: { duration: 0.5, ease: "easeInOut" },
      });

      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };

  useEffect(() => {
    if (result !== null) {
      setIsRolling(false);
      pointerControls.start({
        x: `${positions[result.roll - 1]}px`,
        transition: { duration: 1, ease: "easeInOut" },
      });
    }
  }, [result]);

  useEffect(() => {
    if (isRolling) {
      animatePointer();
    }
  }, [isRolling]);

  return (
    <div className="w-full">
      <div className="flex justify-between">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} className="text-white font-bold text-lg sm:text-xl">
            {num}
          </div>
        ))}
      </div>
      <div className="relative w-full h-12 rounded-3xl border-[8px] sm:border-[12px] border-gray-500 overflow-hidden">
        <div className="absolute inset-0 border-4 sm:border-8 border-gray-800 rounded-2xl">
          <div className="absolute left-0 top-0 w-1/2 h-full bg-red-500"></div>
          <div className="absolute right-0 top-0 w-1/2 h-full bg-green-500"></div>
        </div>
        <motion.div
          className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 w-4 h-8 sm:w-6 sm:h-12 bg-blue-500 rounded-md shadow-lg overflow-hidden"
          animate={pointerControls}
          initial={{ x: `${positions[0]}px` }}
        />
      </div>
    </div>
  );
};

export default DiceLine;
