// components/QuizCard.tsx
import { getSubjects } from "@/app/api/subjects.api";
import catchError from "@/lib/utils/catch-error";
import Link from "next/link";
import styles from "../styles/quizCard.module.css";
type SubjectListProps={
  searchParams:SearchParams;
}

export default async function QuizCard({searchParams}:SubjectListProps) {
  const [payload, error] = await catchError(() => getSubjects());
  

  return (
    <>
      <main>
        <div className="flex justify-between px-8">
          {/* title */}
          <h2 className="text-2xl text-mainColor font-medium	">Quizes</h2>
          {/* view all subject */}
          <div className="text-mainColor font-medium text-2xl" >
            View All
          </div>
        </div>

        <ul className="flex flex-wrap">
          {}
          {payload?.subjects.map((subject) => (
            <li key={subject._id} className="w-1/3 p-4">
              {/* Subject */}

             <Link href={{ pathname: "/en/diplomas", query: { subject: subject._id } }}>
  <div
    className={styles.card}
    style={{ backgroundImage: `url(${subject.icon})` }}
  >
    <div className={styles.cardContent}>
      <h4 className="font-bold text-sm">{subject.name}</h4>
    </div>
  </div>
</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
