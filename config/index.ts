export const BASE_URL =
  process.env.NODE_ENV !== "development"
    ? process.env.NEXT_PUBLIC_BASE_URL!!
    : "http://localhost:3000";


    export const PER_PAGE = 10;