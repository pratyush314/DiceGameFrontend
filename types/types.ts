import { Dispatch, MouseEventHandler } from "react";

export interface RollDiceResponse {
  roll: number;
  newBalance: number;
  hash: string;
}

export interface SideBarProps {
  balance: number;
  betAmount: number;
  setBetAmount: Dispatch<React.SetStateAction<number>>;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  profit: number;
}

export interface HomeProps {
  result: RollDiceResponse;
  isRolling: boolean;
  setIsRolling: Dispatch<React.SetStateAction<boolean>>;
}

export type DiceLineProps = HomeProps;
