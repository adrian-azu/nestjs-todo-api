export default () => ({
  port: parseInt(process.env.PORT, 10),
  secret: process.env.JWT_SECRET,
});
