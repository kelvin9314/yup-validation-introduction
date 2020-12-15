const yup = require('yup')

const regex = Object.freeze({
  password: /^[a-z\d]{8,12}$/i
})

yup.addMethod(yup.string, 'password', function () {
  return this.test({
    name: 'password',
    message: '',
    test: async function (value) {
      console.log(value)
      if(!value){
        return this.createError({
          path: this.path,
          message: '密碼不可為空',
          params: {}
        })
      }
      
      if(!regex.password.test(value)){
        return this.createError({
          path: this.path,
          message: '密碼格式有誤',
          params: {}
        })
      }

      return true
    }
  })
})

const registerSchema = yup.object().shape({
  // password: yup.string().required('密碼不可為空').matches(regex.password, '密碼格式有誤'),
  // password: yup.string().test({
  //   name: 'password',
  //   message: '',
  //   test: async function (value) {
  //     if(!value){
  //       return this.createError({
  //         path: this.path,
  //         message: '密碼不可為空',
  //         params: {}
  //       })
  //     }
      
  //     if(!regex.password.test(value)){
  //       return this.createError({
  //         path: this.path,
  //         message: '密碼格式有誤',
  //         params: {}
  //       })
  //     }
  //   }
  // }),
  password: yup.string().password(),
  // passwordConfirm: yup.string().test('note:passwords-match', '密码输入不一致，请重新确认', function (value) {
  //   return this.parent.password === value
  // }),
  passwordConfirm: yup.string().test({
    name: 'passwordConfirm',
    message: '',
    test: function (value) {
      if(this.parent.password !== value){
        return this.createError({
          path: this.path,
          message: '密码输入不一致，请重新确认',
          params: {}
        })
      }

      return true
    }
  }),
  
})

async function exampleOne() {
  const data = {
    password: '123456789',
    passwordConfirm: '',
  }

  try {
    await registerSchema.validate(data, {abortEarly: false})

    console.log('pass')
     // continue the following job 
  } catch (err) {
    console.log(err.inner)
    // console.log(err.inner[0].message)
  }
}
exampleOne()