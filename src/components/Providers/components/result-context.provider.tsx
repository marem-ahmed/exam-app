"use client";

import { ScoreData } from "@/lib/Types/score";
import React, { createContext, ReactNode, useContext, useState } from "react";

type QuizResultContextType = {
  result: ScoreData | null;
  setResult: (data: ScoreData) => void;
  showModel: boolean;
  setShowModel: (val: boolean) => void;
};

const QuizResultContext = createContext<QuizResultContextType | undefined>(undefined);

export default function QuizResultProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<ScoreData | null>(null);
  const [showModel, setShowModel] = useState(false);

  return <QuizResultContext.Provider value={{ result, setResult, showModel, setShowModel }}>{children}</QuizResultContext.Provider>;
}

export const useExamResult = () => {
  const context = useContext(QuizResultContext);

  if (!context) {
    throw new Error("useExamResult must be used within a QuizResultProvider");
  }

  return context;
};
