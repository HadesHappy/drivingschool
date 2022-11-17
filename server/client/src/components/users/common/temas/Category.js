import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { readTests } from '../../../../actions/test'
import NamedTest from '../tests/NamedTest'

const Category = ({ category = '', selectedCategory, setSelectedCategory }) => {
  const dispatch = useDispatch()
  const tests = useSelector(state => state.todoReducer.tests)
  const loading = useSelector(state => state.todoReducer.loading)
  const [string, setString] = useState('')

  const onCategoryClick = async () => {
    if (selectedCategory === category.id)
      setSelectedCategory('')
    else {
      setSelectedCategory(category.id)
      await dispatch(readTests(category.id))
    }
  }

  useEffect(() => {
    setString(
      tests.map((test, key) =>
        <NamedTest test={test} key={key} name={category.id} />
      )
    )
  }, [loading])

  return (
    <>
      <div className='flex-col justify-center px-32 py-5 mb-3 text-2xl uppercase text-white bg-[#7BC6F8] w-full cursor-pointer hover:bg-blue-400' id={category.id} onClick={onCategoryClick}>
        {category.text}
      </div>
      {
        selectedCategory === category.id ?
          (
            <div>
              {string}
            </div>
          )
          :
          (
            <></>
          )
      }
    </>

  )
}

export default Category