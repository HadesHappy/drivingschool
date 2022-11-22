import { useEffect, useState } from 'react'
import { loginFields } from './FormFields'
import Input from './Input'
import FormAction from './FormAction';
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const fields = loginFields;
let fieldState = {};
fields.forEach(field => fieldState[field.id] = '');

export default function Login() {
  const [formData, setFormData] = useState(fieldState);
  const navigate = useNavigate()
  const { isLoggedIn, login, account } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      if (account.name === 'admin')
        navigate('/admin')
      else
        navigate('/user/todotest')
    }
  }, [isLoggedIn])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleClick = async () => {
    if (formData.name === '' || formData.password === '') {
      toast.error('Fill all the blanks.')
    }
    else {
      await login(formData)
    }
  }

  return (
    <form className='mt-8 space-y-6 border rounded-lg pb-5 px-3'>
      <div className='-space-y-px '>
        {
          fields.map(field =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={formData[field.id]}
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
      <FormAction handleClick={handleClick} text='Login' />
    </form>
  )
}