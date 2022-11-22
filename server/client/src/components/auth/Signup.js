import { useState } from 'react';
import { signupFields } from "./FormFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { FaUpload } from 'react-icons/fa'
import { FileUploader } from 'react-drag-drop-files'

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const [isHover, setIsHover] = useState(false)
  const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });
  const [avatar, setAvatar] = useState('/assets/emotions/avatar1.png')
  const fileTypes = ['JPG', 'PNG', 'GIF', 'jpg', 'png', 'gif'];

  const handleSubmit = () => {
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount = () => {

  }

  const handleDropChange = async (dropFile) => {
    setAvatar(URL.createObjectURL(dropFile))
  }

  return (
    <div className="mt-8" onSubmit={handleSubmit}>
      <div className='flex flex-col justify-center items-center'>
        <FileUploader
          handleChange={handleDropChange}
          name="file"
          types={fileTypes}
          children={
            <div class="rounded-full shadow-lg text-center w-48 h-48 flex items-center justify-center cursor-pointer" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
              {
                isHover ?
                  <FaUpload className='text-center w-28 h-28 text-teal-400' />
                  :
                  <div>
                    <img className="rounded-full w-full h-full" src={avatar} alt="Avatar Upload" />
                  </div>

              }
            </div>
          }
        />
      </div>
      <>
        {
          fields.map(field =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
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
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </>
    </div>
  )
}