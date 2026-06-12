// utils.ts
export function formatDate(dateString: string | number | Date) {

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const API_URL = "http://localhost:5001/api";