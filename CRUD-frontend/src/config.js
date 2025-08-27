const host = window.location.hostname;

export const base_URL = host === "localhost" ? "http://localhost:8000/api/" : "";