"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { questionFields, useFormSchema } from "@/lib/schemes/question.schema";
import { Question } from "@/lib/Types/question";
import { cn } from "@/lib/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import QuizDuration from "./quiz-duration";
import { toast } from "sonner";
import { useExamResult } from "@/components/providers/components/result-context.provider";

type QuestionsFormProps = {
  questions: Question[];
};

export default function QuizForm({ questions }: QuestionsFormProps) {
  // Hooks
  const FormSchema = useFormSchema();
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [startTime, setStartTime] = useState(Date.now());
  const { setResult, setShowModel } = useExamResult();

  const currentQuestion = questions[step];

  const form = useForm<questionFields>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<questionFields> = async (data) => {
    const endTime = Date.now();
    const durationTaken = Math.floor((endTime - startTime) / 1000);

    try {
      const response = await fetch("/api/questions/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: data.answers,
          time: durationTaken,
        }),
      });

      const responseData = await response.json();
      toast.success("Answers done ");
      setResult({
        total: responseData.total,
        correct: responseData.correct,
        wrong: responseData.wrong,
        WrongQuestions: responseData.WrongQuestions,
        correctQuestions: responseData.correctQuestions,
        message: responseData.message,
      });
      setShowModel(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="">
        {/* header */}
        <header className="flex items-center justify-between gap-2 mt-4">
          <p>
            Question {step + 1} of {questions.length}
          </p>
          {/* duration */}
          <QuizDuration duration={questions[0].exam.duration}></QuizDuration>
        </header>
        {/* Steps */}
        <ul className="flex items-center justify-between   mt-4">
          {Array.from({ length: questions.length }, (_, i) => i).map((i) => (
            <li key={i} className={cn("size-2 rounded-full transition-colors", step >= i ? "bg-blue-600" : "bg-gray-300")} />
          ))}
        </ul>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6  w-full">
            <FormField
              control={form.control}
              name={`answers.${step}`}
              render={({ field }) => (
                <FormItem className="space-y-3 mt-4">
                  {/* Label */}
                  <FormLabel className="mt-4 font-bold text-xl">{currentQuestion.question}</FormLabel>
                  {/* Answers */}
                  <FormControl>
                    <RadioGroup
                      name={currentQuestion._id}
                      className="flex flex-col space-y-1"
                      onValueChange={(value) => {
                        setAnswer(value);
                        field.onChange({
                          questionId: currentQuestion._id,
                          correct: value,
                        });
                      }}
                      value={answer}>
                      {currentQuestion?.answers.map((ele) => (
                        <FormItem key={ele.key} className="flex items-center space-x-3 space-y-0 bg-darkWhite border-2 p-3  rounded-lg">
                          <FormControl>
                            {/* Radio */}
                            <RadioGroupItem value={ele.key} />
                          </FormControl>
                          {/* Label Of Answer */}
                          <FormLabel className="font-normal w-full">{ele.answer}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <footer className="flex justify-between gap-4  mt-4 w-full ">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const prevAnswer = form.getValues(`answers.${step - 1}`);
                  if (prevAnswer.correct) {
                    setAnswer(prevAnswer.correct);
                  } else {
                    setAnswer("");
                  }
                  setStep((prev) => prev - 1);
                }}
                disabled={step === 0}
                className="bg-main-color text-white py-1 px- rounded-xl mt-2 border-main-color w-1/2">
                Back
              </Button>

              {step === questions.length - 1 ? (
                <Button type="submit" className="bg-main-color text-white py-1 px-7 rounded-xl mt-2 border-main-color w-1/2">
                  Submit
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => {
                    const currentAnswer = form.getValues(`answers.${step}`);
                    if (currentAnswer?.correct) {
                      const nextAnswer = form.getValues(`answers.${step + 1}`);
                      setAnswer(nextAnswer?.correct || "");
                      setStep((prev) => prev + 1);
                    }
                  }}
                  disabled={!form.getValues(`answers.${step}`)?.correct}
                  className="bg-main-color text-white py-1 px-7 rounded-xl mt-2 border-main-color w-1/2 ">
                  Next
                </Button>
              )}
            </footer>
          </form>
        </Form>
      </div>
    </div>
  );
}
