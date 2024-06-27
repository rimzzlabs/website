export async function safeParseJSON(request: Request) {
  try {
    return await request.json();
  } catch (error) {
    return null;
  }
}
