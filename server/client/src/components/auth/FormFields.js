const loginFields = [
  {
    labelText: "name",
    labelFor: "name",
    id: "name",
    name: "name",
    type: "text",
    autoComplete: "name",
    isRequired: true,
    placeholder: "name"
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password"
  }
]

const signupFields = [
  {
    labelText: "name",
    labelFor: "name",
    id: "name",
    name: "name",
    type: "text",
    autoComplete: "name",
    isRequired: true,
    placeholder: "name"
  },
  // {
  //   labelText: "Email address",
  //   labelFor: "email-address",
  //   id: "email-address",
  //   name: "email",
  //   type: "email",
  //   autoComplete: "email",
  //   isRequired: true,
  //   placeholder: "Email address"
  // },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password"
  },
  {
    labelText: "Confirm Password",
    labelFor: "confirmPassword",
    id: "confirmPassword",
    name: "confirmPassword",
    type: "password",
    autoComplete: "confirmPassword",
    isRequired: true,
    placeholder: "Confirm Password"
  }
]

export { loginFields, signupFields }