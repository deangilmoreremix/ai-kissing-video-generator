export function getMuApiKey() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("muapi_api_key") || null;
}

export async function apiFetch(input, init = {}) {
  const key = getMuApiKey();
  const headers = new Headers(init.headers || {});

  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  if (key) {
    headers.set("x-mu-api-key", key);
  }

  return fetch(input, {
    ...init,
    headers,
  });
}

export async function apiFetchFormData(input, formData, extraHeaders = {}) {
  const key = getMuApiKey();
  const headers = new Headers(extraHeaders);

  if (key) {
    headers.set("x-mu-api-key", key);
  }

  return fetch(input, {
    method: "POST",
    headers,
    body: formData,
  });
}
