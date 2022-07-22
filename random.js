const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

const calculo = (cantidad) => {
  const numeros = [];
  const valores = {};
  for (let i = 0; i < cantidad; i++) {
    numeros.push(getRandomInt(1, 1000));
  }
  numeros.map((val) => {
    valores[val] = numeros.filter((v) => v == val).length;
  });
  return valores;
};

process.on("message", (cantidad) => {
  const resultado = calculo(cantidad);
  process.send(resultado);
});
