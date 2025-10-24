// exempel som kan kopieras till config.js och fyll i värden
export const config = {
  // MongoDB connection string
  mongodbUri:
    "mongodb+srv://username:password@cluster.mongodb.net/moment4_auth?retryWrites=true&w=majority",

  // JWT settings
  jwtSecret: "key-här",
  jwtExpiresIn: "24h",

  // Server settings
  port: 3000,
  nodeEnv: "development",
};
