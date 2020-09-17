import './index.scss';

function sum(a: number, b: number) {
  console.log(a);
  console.log(b);
  console.log(a + b);
  return a + b;
}

sum(1, 2);

const people: string = 'ПРИВЕТ РЕБЯТА ВСЕМ НА СВЯЗИ ЁПСТУДЕЙ КАК МАЛО НА ЗЕМЛЕ ПОРЯДОЧЫХ ЛЮДЕЙ';
console.log(people);
module.exports = sum;
