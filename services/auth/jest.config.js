import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

/** @type {import("jest").Config} **/
export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: {
          module: "esnext",
          esModuleInterop: true,
        },
      },
    ],
  },
  transformIgnorePatterns: ["node_modules/(?!(uuid)/)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
