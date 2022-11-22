import React from 'react'
import Header from '../../components/auth/Header'
import Signup from '../../components/auth/Signup'

const SignUp = () => {
  return (
    <div className='min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <Header
          heading="Signup to create an account"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/"
        />
        <div className='border rounded-xl px-3 pb-7'>
          <Signup />
        </div> 
      </div>
    </div>
  )
}

export default SignUp