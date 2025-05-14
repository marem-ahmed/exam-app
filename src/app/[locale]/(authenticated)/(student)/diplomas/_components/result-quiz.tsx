// components/ResultModal.tsx
"use client";

import { useExamResult } from "@/components/providers/components/result-context.provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

export default function ResultQuiz() {
  const { result, showModel, setShowModel } = useExamResult();

  const [open, setOpen] = useState(false);

  const correct = result?.correct ?? 0;
  const incorrect = result?.wrong ?? 0;
  const total = correct + incorrect;
  const score = Math.round((correct / total) * 100);
  useEffect(() => {
    if (showModel) {
      setOpen(true);
    }
  }, [showModel]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md p-6 rounded-2xl shadow-xl text-center">
        <h2 className="text-lg font-semibold mb-4">Your score</h2>
        <div className="flex justify-around  items-center ">
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24 ">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="42" stroke="#E63946" strokeWidth="12" fill="none" />
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  stroke="#3b82f6"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * score) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">{score}%</div>
            </div>
          </div>

          <div className="flex flex-col  text-sm gap-y-6  mb-4">
            <div className="text-blue-600 font-medium	text-lg flex">
              Correct
              <span className=" border-blue-600 rounded-full ml-3 size-6 items-center border-2 text-sm flex items-center justify-center">
                {correct}
              </span>
            </div>
            <div className="text-red-600 font-medium	text-lg flex">
              Incorrect
              <span className=" border-red-600 rounded-full ml-3 size-6 items-center border-2 text-sm flex items-center justify-center">
                {incorrect}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4 ">
          <Button
            variant="outline"
            className="w-full bg-main-color text-white py-1 px- rounded-xl mt-2 border-main-color"
            onClick={() => setOpen(false)}>
            Back
          </Button>
          <Button variant="outline" className="w-full bg-main-color text-white py-1 px- rounded-xl mt-2 border-main-color">
            Show results
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
