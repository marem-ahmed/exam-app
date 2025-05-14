"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { convertSearchParams } from "@/lib/utils/convert-search-params";
import QuizForm from "./quiz-form";
import { useExamResult } from "@/components/providers/components/result-context.provider";
import ResultQuiz from "./result-quiz";
// Types
type QuestionsDialogProps = {
  searchParams: SearchParams;
};
export default function QuizDialog({ searchParams }: QuestionsDialogProps) {
  // Hooks
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<any>(null);
  const { showModel, result } = useExamResult();
  const [error, setError] = useState<string | null>(null);

  // Effects
  useEffect(() => {
    // Close this quiz dialog if the result modal is open
    if (showModel) {
      setOpen(false);
    }
  }, [showModel]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/get-questions?${convertSearchParams(searchParams)}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error || "Something went wrong");
        setPayload(data);
        console.log(payload);
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (open) {
      fetchQuestions();
    }
  }, [open, searchParams]);
  return (
    <div>
      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        {/* Strat */}
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-main-color text-white py-1 px-7 rounded-xl mt-2 border-main-color">
            start
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            {/* TiTle */}
            <DialogTitle>{payload?.questions[0].exam?.title || "Loading..."}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {/* Form */}
          {payload?.questions && <QuizForm questions={payload.questions} />}
        </DialogContent>
        {showModel && <ResultQuiz />}
      </Dialog>

      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
}
