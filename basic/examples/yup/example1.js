const yup = require('yup')

const schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive('數字需要為正整數').integer(),
  email: yup.string().email(),
  website: yup.string().url(),
  createdOn: yup.date().default(function () {
    return new Date();
  }),
});

async function example1() {
  // NOTE isValid
  try {
    const data = {
      name: 'Kelvin',
      age: 24,
    }
    const valid = await schema.isValid(data)
    console.log(valid)
  } catch (error) {
    console.log(error)
  }
  
}
// example1()

async function example2(field) {
  // NOTE validateAt
  try {
      const data = {
        name: 'Kelvin',
        age: -24,
      }
    await schema.validateAt(field, data)

    console.log('pass')
    // reset the error state on this field
  } catch (error) {
    console.log(error)
    // set the error message into state
  }
  
}

// example2('age')

async function example3() {
  // NOTE validate
  try {
      const data = {
        name: 'Kelvin',
        age: 24,
      }
    await schema.validate(data)

    console.log('pass')
    // continue the flowing job 
  } catch (error) {
    console.log(error)
    // set the error message into state
  }
  
}

example3()