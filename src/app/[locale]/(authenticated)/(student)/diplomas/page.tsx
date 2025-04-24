import React from 'react'
import QuizesList from "./_components/quizes-list"

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div>
      <QuizesList searchParams={searchParams}></QuizesList>
    </div>
  );
}
