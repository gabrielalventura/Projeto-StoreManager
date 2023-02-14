const app = require('./app');
require('dotenv').config();
// const connection = require('./db/connection');

// // // não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

// app.listen(process.env.PORT, async () => {
//   console.log(`Escutando na porta ${process.env.PORT}`);

//   // O código abaixo é para testarmos a comunicação com o MySQL
//   const [result] = await connection.execute('SELECT 1');
//   if (result) {
//     console.log('MySQL connection OK');
//   }
// });