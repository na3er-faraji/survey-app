const calculateAge = (birthDate: Date): Number => {
  let timeDiff = Math.abs(
    Date.now() - new Date(birthDate || new Date()).getTime()
  );
  return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
};

function getKeyByValue(object: { [x: string]: any }, row: string) {
  return object[row];
}

export { calculateAge, getKeyByValue };
