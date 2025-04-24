import { JSON_HEADER } from "@/lib/Constants/api.constant";
import { getAuthHeader } from "@/lib/utils/auth-header";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();


  const res = await fetch(
    "https://exam.elevateegy.com/api/v1/questions/check",
    {
      method: "POST",
      headers:{
        ...JSON_HEADER ,
        ...(await getAuthHeader())
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();
  

  

  
  return NextResponse.json(data);
}
