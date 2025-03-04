"use client";
import Home from "@/components/Home";
import { toast } from "sonner";
import SideBar from "@/components/SideBar";
import useWallet from "@/hooks/useWallet";
import { RollDiceResponse } from "@/types/types";
import axios from "axios";
import React, { useState } from "react";

const Page = () => {
  const { balance, addBalance } = useWallet();
  const [betAmount, setBetAmount] = useState<number>(0.0);
  const [profit, setProfit] = useState<number>(0);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [result, setResult] = useState<RollDiceResponse>({
    roll: 1,
    newBalance: Number(balance),
    hash: "",
  });

  const playDice = async () => {
    setIsRolling(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT!}/roll-dice`,
        {
          betAmount,
          walletBalance: Number(balance),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data: RollDiceResponse = res.data;
      // To Simulate Dice Roll
      delayResult(data);
    } catch (error) {
      console.log("Error While Rolling Dice !,", error);
      setIsRolling(false);
    }
  };

  const delayResult = (data: RollDiceResponse) => {
    setTimeout(() => {
      setIsRolling(false);
      setProfit(data.newBalance - Number(balance));
      addBalance(data.newBalance.toString());
      setResult(data);
      setBetAmount(0);
    }, 2000);
  };

  const handleClick = () => {
    if (betAmount <= 0) {
      toast.error("Increase bet to play", {
        unstyled: true,
        duration: 2000,
        position: "top-center",
        classNames: {
          toast: "text-xl rounded-lg flex items-center p-2 bg-yellow-500",
        },
      });
      return;
    }
    playDice();
  };

  return (
    <main className="bg-gray-900">
      <div className="flex flex-col md:flex-row w-full h-full">
        <section className="w-full md:w-[20%] bg-gray-700">
          <SideBar
            balance={Number(balance)}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            handleClick={handleClick}
            profit={profit}
          />
        </section>
        <section className="w-full md:w-[80%]">
          <Home
            result={result}
            isRolling={isRolling}
            setIsRolling={setIsRolling}
          />
        </section>
      </div>
    </main>
  );
};

export default Page;
