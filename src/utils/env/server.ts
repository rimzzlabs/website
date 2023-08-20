const umamiUsername = process.env.UMAMI_USERNAME
const umamiPassword = process.env.UMAMI_PASSWORD
const umamiDeployedUrl = process.env.UMAMI_DEPLOYED_URL

if (!umamiUsername || !umamiPassword || !umamiDeployedUrl) {
  throw new Error('Required server env missing, check your code at src/utils/env/server.ts')
}

export const UMAMI_DEPLOYED_URL = umamiDeployedUrl
export const UMAMI_USERNAME = umamiUsername
export const UMAMI_PASSWORD = umamiPassword
