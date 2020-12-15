const yup = require('yup')

const schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive('數字需要為正整數').integer(),
  email: yup.string().email(),
  website: yup.string().url(),
});

async function exampleOne() {
  // TAG isValid
  try {
    const data = {
      name: 'Kelvin',
      age: 24,
    }
    const valid = await schema.isValid(data)
    console.log(valid)
  } catch (err) {
    console.log(err)
  }
  
}
// exampleOne()

async function exampleTwo(field) {
  // TAG validateAt
  try {
      const data = {
        name: 'Kelvin',
        age: -24,
      }
    await schema.validateAt(field, data)

    console.log('pass')
    // reset the error state on this field
  } catch (err) {
    console.log(err)
    // set the error message into state
  }
  
}
// exampleTwo('age')

async function exampleThree() {
  // TAG validate
  try {
      const data = {
        // name: 'Kelvin',
        age: -24,
        email: 123456789
      }
    await schema.validate(data) 
    // await schema.validate(data, { abortEarly: false })

    console.log('pass')
    // continue the following job 
  } catch (err) {
    console.log(err)
    // console.log(err.inner)
    // set the error message into state one by one according to the filed name
  }
  
}
// exampleThree()