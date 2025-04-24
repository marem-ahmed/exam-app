
export default async function catchError<T>(
  callback:()=> Promise<APIResponse<T>>
): Promise<[SuccessFulResponse<T> , null]|[null , string]> {
  try {
    const payload = await callback();
    if ("code" in payload && payload.code !== 200) {
      throw new Error(payload.message || 'Unknown error');
    }
    return [payload as SuccessFulResponse<T>, null];
  } catch (error) {
    return [null, (error as Error).message];
  }
}