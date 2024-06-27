export function createResponse<D>(
  status: "success" | "error",
  { message, data }: { data?: D; message: string },
) {
  return JSON.stringify({ status, message, data: data ?? null });
}

export function createResponseInit(status: number) {
  return {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  };
}
