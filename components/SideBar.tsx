import { SideBarProps } from "@/types/types";
import { IndianRupee } from "lucide-react";
import React from "react";

const SideBar = ({
  balance,
  betAmount,
  setBetAmount,
  handleClick,
  profit,
}: SideBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const betAmt = Number(e.target.value);
    if (betAmt > balance) {
      return;
    }
    setBetAmount(Number(e.target.value));
  };

  return (
    <div className="min-h-screen flex flex-col text-white p-4 rounded-lg shadow-lg bg-gray-800">
      <div className="mb-6">
        <p className="flex justify-between text-sm mb-2 text-gray-400">
          <label className="text-lg">Wallet Balance</label>
          <label className="text-lg">{balance} ETH</label>
        </p>
      </div>

      <div className="mb-6">
        <p className="flex justify-between text-sm mb-2 text-gray-400">
          <label className="text-lg">Bet Amount</label>
          <label className="text-lg">{balance} ETH</label>
        </p>
        <div className="flex items-center gap-2 border-0 border-gray-700 shadow-lg shadow-gray-900/50 rounded-lg p-2 bg-gray-700">
          <div className="relative flex-grow">
            <input
              className="bg-gray-800 rounded-lg p-2 w-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
              type="text"
              placeholder="0.00"
              onChange={handleChange}
              value={betAmount}
            />
            <span className="absolute inset-y-0 right-2 flex items-center text-gray-400">
              <div className="rounded-full bg-amber-400 p-1">
                <IndianRupee className="text-gray-800 w-3 h-3" />
              </div>
            </span>
          </div>
          <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded-lg transition duration-300 text-sm cursor-pointer">
            1/2
          </button>
          <span className="text-gray-500 text-2xl">|</span>
          <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded-lg transition duration-300 text-sm cursor-pointer">
            2x
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label className="flex justify-between text-lg mb-2 text-gray-400">
          <span>Profit on Win</span>
          <span>{balance} ETH</span>
        </label>
        <div className="flex items-center justify-between bg-gray-700 p-2 rounded-lg">
          <span className="text-gray-300">{profit}</span>
          <span className="text-gray-400">
            <div className="rounded-full bg-amber-400 p-1">
              <IndianRupee className="text-gray-800 w-3 h-3" />
            </div>
          </span>
        </div>
      </div>

      <button
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition duration-300 cursor-pointer text-lg font-semibold"
        onClick={handleClick}
      >
        Bet
      </button>
    </div>
  );
};

export default SideBar;
