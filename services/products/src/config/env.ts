import type { environment } from "../types/env.ts";

const env: environment = {
  ENV: (process.env.NODE_ENV as string) || "local",
  PORT: (process.env.PORT as unknown as number) || 5001,
  DATABASE_URL: process.env.DATABASE_URL as string,
};

export default env;
