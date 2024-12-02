export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      JWT_PRIVATE_KEY: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}
