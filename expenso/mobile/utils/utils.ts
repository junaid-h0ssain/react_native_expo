import { Platform } from "react-native";

export const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// export const API_URL = "http://localhost:5001/api";

export const API_URL = Platform.OS === "android"
      ? "http://10.0.2.2:5001/api"
      : "http://localhost:5001/api";
