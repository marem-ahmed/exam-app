import React, { Suspense } from "react";
import QuizCard from "./_components/subjectCard";
import UserCard from "./_components/userInfo";

export default async function Userdashboard() {
 
  return (
    <>
   <main>
    <UserCard
     name="Mariam Ahmed"
  avatarUrl="/assets/images/user.png"
  passed={27}
  fastestTime="13 min"
  correctAnswers={200}
    ></UserCard>
    <Suspense fallback={"....loging"}>
      <QuizCard></QuizCard>

    </Suspense>
   </main>

   
    </>
  );
}
