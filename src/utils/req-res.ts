export type TResponse<D> = {
  status: "success" | "error";
  message: string;
  data: D | null;
};

export function composeResponse<D>(
  status: "success" | "error",
  { message, data }: { message: string; data?: D },
): TResponse<D> {
  return {
    status,
    message,
    data: data ?? null,
  };
}

export function composeResponseHeaders(status: number) {
  return { status, headers: { "Content-Type": "application/json" } };
}

export async function safeParseJSON(request: Request) {
  try {
    return await request.json();
  } catch (error) {
    return null;
  }
}
