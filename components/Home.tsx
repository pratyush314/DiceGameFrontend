import React, { useEffect, useState } from "react";
import DiceLine from "./DiceLine";
import { Check, Percent, RefreshCcwDotIcon, X } from "lucide-react";
import { HomeProps } from "@/types/types";
import CryptoJS from "crypto-js";
const Home = ({ result, isRolling, setIsRolling }: HomeProps) => {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const verifyHash = () => {
    if (!result.hash || !result.roll) {
      setIsVerified(false);
      return;
    }
    const generatedHash = CryptoJS.SHA256(result.roll.toString()).toString();
    setIsVerified(generatedHash === result.hash);
  };

  useEffect(() => {
    setIsVerified(null);
  }, [result]);
  return (
    <div className="md:min-h-screen min-h-[21vh] flex flex-col justify-center items-center bg-gray-900 text-white">
      <div className="w-full md:w-[1000px] px-4 md:px-0">
        <DiceLine
          result={result}
          isRolling={isRolling}
          setIsRolling={setIsRolling}
        />
      </div>

      <div className="hidden md:block w-full md:w-[1000px] px-4 md:px-0 mt-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <p className="text-gray-400 text-lg">Roll Hash:</p>
              <div className="flex items-center gap-2">
                <span className="text-white text-sm sm:text-base break-all">
                  {result.hash === ""
                    ? "Click on Bet to start playing"
                    : result.hash}
                </span>
                {isVerified !== null &&
                  (isVerified ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-red-500" />
                  ))}{" "}
              </div>
            </div>

            <button
              onClick={verifyHash}
              className="w-fit text-lg cursor-pointer hover:bg-green-500 text-white rounded-2xl p-2 bg-green-600 transition duration-300"
            >
              Verify Fairness
            </button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-[1000px] bg-gray-800 py-6 fixed bottom-0 md:bottom-2 rounded-lg">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 sm:px-0">
            {/* Multiplier */}
            <div className="flex flex-col">
              <label className="text-gray-400 text-lg sm:text-xl font-semibold mb-2">
                Multiplier
              </label>
              <div className="flex justify-between items-center gap-2 p-2 rounded-lg border-4 border-gray-700 w-full bg-gray-900">
                <span className="text-white text-base sm:text-lg font-bold">
                  2.00000
                </span>
                <span className="text-gray-400">
                  <X />
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-400 text-lg sm:text-xl font-semibold mb-2">
                Roll Over
              </label>
              <div className="flex justify-between items-center gap-2 p-2 rounded-lg border-4 border-gray-700 w-full bg-gray-900">
                <span className="text-white text-base sm:text-lg font-bold">
                  50.50
                </span>
                <span className="text-gray-400">
                  <RefreshCcwDotIcon />
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-400 text-lg sm:text-xl font-semibold mb-2">
                Win Chance
              </label>
              <div className="flex justify-between items-center gap-2 p-2 rounded-lg border-4 border-gray-700 w-full bg-gray-900">
                <span className="text-white text-base sm:text-lg font-bold">
                  49.5000
                </span>
                <span className="text-gray-400">
                  <Percent />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
