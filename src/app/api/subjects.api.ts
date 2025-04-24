import { Subject } from "@/lib/Types/subjects";
import { getAuthHeader } from "@/lib/utils/auth-header";

export async function getSubjects(){
    const res=await fetch(`${process.env.API}/subjects`,{
       headers: {
      ...(await getAuthHeader()),
    }
    })
    if(!res.ok){
      throw new Error("Failed to fetch subjects")
    }
    const payload:APIResponse<PaginatedResponse<{subjects:Subject[]}>>=await res.json()
    return payload

}