function asyncTask() {
  return functionA()
    .then((valueA) => functionB())
    .then((valueB) => functionC(valueB))
    .then((valueC) => functionD(valueC))
    .catch((err) => logger.error(err));
}

const asyncFnc = async () => {
  try {
    const valueA = await functionA();
    const valueB = await functionB(valueA);
    const valueC = await functionC(valueB);

    return await functionD(valueC);
  } catch (err) {
    logger.error(err);
  }
};

async function asyncTask() {
  const [valueA, valueB] = await Promise.all(functionA, functionB);

  return functionA()
    .then((valueA) => functionB())
    .then((valueB) => functionC(valueB))
    .catch((err) => logger.error(err));
}
