import { useState } from 'react'
import { loginFields } from './FormFields'
import Input from './Input'
import FormAction from './FormAction';

const fields = loginFields;
let fieldState = {};
fields.forEach(field => fieldState[field.id] = '');

export default function Login() {
  const [loginState, setLoginState] = useState(fieldState);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value })
  }

  const handleSubmit = () => {
    //    authenticateUser();
  }

  return (
    <div className='mt-8 space-y-6 border rounded-lg pb-5 px-3'>
      <div className='-space-y-px '>
        {
          fields.map(field =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={loginState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          )
        }
      </div>
      <FormAction handleSubmit={handleSubmit} text='Login' />
    </div>
  )
}