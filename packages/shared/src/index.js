const { useState } = require('react');

module.exports.useRandom = () => {
  const [number] = useState(Math.random());
  return number;
}
