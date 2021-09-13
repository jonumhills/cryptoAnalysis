export default {
  host: "localhost",
  user: "root",
  password: "add ur password",
  database: "portfolio",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
