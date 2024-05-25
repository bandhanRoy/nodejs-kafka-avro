const { faker } = require('@faker-js/faker');

const generateUser = () => {
  return {
    id: faker.number.int({ min: 1, max: 3 }),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
  };
};

const generatePost = () => {
  return {
    id: faker.number.int({ min: 1, max: 50 }),
    authorId: faker.number.int({ min: 1, max: 3 }),
    content: faker.word.words(100),
  };
};

module.exports = {
  generateUser,
  generatePost,
};
