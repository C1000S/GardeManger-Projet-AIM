require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[server] GardeManger API sur http://localhost:${PORT}`);
    console.log(`[server] Health : http://localhost:${PORT}/api/health`);
  });
})();
