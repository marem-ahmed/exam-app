export default async function catchError<T, E extends new (message?: string) => Error>(
  promise: Promise<APIResponse<T>>,
  errorsToCatch?: E[]
): Promise<[T, null] | [null, InstanceType<E>]> {
  try {
    const data = await promise;

    if ("code" in data) throw new Error(data.message);

    return [data, null];
  } catch (error) {
    if (!errorsToCatch) {
      return [null, error as InstanceType<E>];
    }

    if (errorsToCatch.some((e) => error instanceof e)) {
      return [null, error as InstanceType<E>];
    }

    throw error;
  }
}
