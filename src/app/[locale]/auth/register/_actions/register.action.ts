"use server";

import { RegistertionInputs } from "@/lib/schemes/auth.schema";
import { RegisterResponse } from "@/lib/Types/auth";
import { JSON_HEADER } from "@/lib/Constants/api.constant";

export const registerAction = async (
  RegistertionInputs: RegistertionInputs
) => {
  const respones = await fetch(`${process.env.API}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(RegistertionInputs),
    headers: {
      ...JSON_HEADER,
    },
  });

  const payload: APIResponse<RegisterResponse> = await respones.json();

  return payload;
};