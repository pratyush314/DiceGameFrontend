// hooks/useWallet.ts
import { useState, useEffect } from "react";
import { Wallet, parseEther, formatEther } from "ethers";

const useWallet = () => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [balance, setBalance] = useState<string>("0");

  useEffect(() => {
    const storedPrivateKey = localStorage.getItem("walletPrivateKey");

    let walletInstance: Wallet;
    if (storedPrivateKey) {
      walletInstance = new Wallet(storedPrivateKey);
    } else {
      const newWallet = Wallet.createRandom();
      walletInstance = new Wallet(newWallet.privateKey);
      localStorage.setItem("walletPrivateKey", newWallet.privateKey);
    }

    setWallet(walletInstance);
    setBalance("1000");
  }, []);

  const addBalance = (amount: string) => {
    const newBalance = BigInt(parseEther(amount));
    setBalance(formatEther(newBalance));
  };

  return { wallet, balance, addBalance };
};

export default useWallet;
