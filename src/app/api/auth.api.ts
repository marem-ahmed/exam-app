import { JSON_HEADER } from "@/lib/Constants/api.constant";

export async function forgetPassword(email: string) {
  const res = await fetch(`https://exam.elevateegy.com/api/v1/auth/forgotPassword`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
    },
    body: JSON.stringify({ email }),
  });
  const payload = await res.json();
  console.log(payload);

  return payload;
}

export async function verfiyPassword(resetCode: string) {
  const res = await fetch(`https://exam.elevateegy.com/api/v1/auth/verifyResetCode`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
    },
    body: JSON.stringify({ resetCode }),
  });

  const payload = await res.json();

  return payload;
}

export async function resetPassword(email: string, password: string, newPassword: string, code: string) {
  const res = await fetch(`https://exam.elevateegy.com/api/v1/auth/resetPassword`, {
    method: "PUT",
    headers: {
      ...JSON_HEADER,
    },
    body: JSON.stringify({ email, newPassword, code }),
  });

  const payload = await res.json();

  return payload;
}
