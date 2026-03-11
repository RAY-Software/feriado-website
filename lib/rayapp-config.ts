function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
      `Check your .env file or deployment configuration.`
    );
  }
  return value.trim();
}

export const rayappConfig = {
  get apiBaseUrl() {
    return requireEnv('RAYAPP_API_BASE_URL');
  },
  get companyId() {
    return requireEnv('RAYAPP_COMPANY_ID');
  },
  get companyName() {
    return requireEnv('RAYAPP_COMPANY_NAME');
  },
};
