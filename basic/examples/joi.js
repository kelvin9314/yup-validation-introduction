const Joi = require('joi')

async function example() {
  const simpleSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(10).required(),
    birth_year: Joi.number().integer().required()
  })

  try {
    const inputData = { username: 'KelvinMok', birth_year: 1995 }
    const result = await simpleSchema.validate(inputData);

    console.log(result)
  }catch (err) { 
    console.log(err)
  }

}

example()