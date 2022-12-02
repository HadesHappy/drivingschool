import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTestData } from '../../../../apis/test.api'
import NamedTest from '../tests/NamedTest'

const Category = ({ category = '', selectedCategory, setSelectedCategory }) => {
  const dispatch = useDispatch()
  const tests = useSelector(state => state.todoReducer.tests)
  const categoryLoading = useSelector(state => state.todoReducer.categoryLoading)
  let string

  const onCategoryClick = () => {
    if (selectedCategory === category.id)
      setSelectedCategory('')
    else {
      setSelectedCategory(category.id)
      dispatch(getTestData(category.id))
    }
  }

  if (!categoryLoading) {
    string = (
      tests.map((test, key) =>
        <NamedTest test={test} key={key} name={category.id} />)
    )
  }

  return (
    <>
      <div className='flex-col justify-center px-32 py-5 mb-3 text-2xl uppercase text-white bg-[#7BC6F8] w-full cursor-pointer hover:bg-blue-400' id={category.id} onClick={onCategoryClick}>
        {category.text}
      </div>
      {
        selectedCategory === category.id ?
          string
          :
          <></>
      }
    </>
  )
}

export default Category