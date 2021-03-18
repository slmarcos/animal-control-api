export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/animal-control',
  port: process.env.PORT ?? 3011
}
