export default {
  host: "localhost",
  user: "root",
  password: "1234",
  database: "portfolio",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
