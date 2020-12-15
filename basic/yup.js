const yup = require('yup')

async function example_1() {

  const  schema = yup.object().shape({
    name: yup.string().required(),
    age: yup.number().required().positive().integer(),
    email: yup.string().email(),
    website: yup.string().url(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });

  schema
  .isValid({
    name: 'Kelvin',
    age: 24,
  })
  .then(function (valid) {
    // valid; // => true
    console.log(valid)
  });
  



}

example_1()