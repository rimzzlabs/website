export async function getData<R>(url: string) {
  let res = await fetch(url);
  let json = await res.json();

  return json as R;
}

export async function postData<R, P>(url: string, payload: P) {
  let body = JSON.stringify(payload);
  let res = await fetch(url, {
    body,
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  let json = await res.json();

  return json as R;
}
