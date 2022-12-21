const DisplayImage = ({ total = '', images = [] }) => {
  let display
  if (total > 5) {
    let subImages = []
    for (let i = 0; i < 4; i++)
      subImages.push(images[i])
    const extraNum = total - 4
    display = (
      <div className='flex justify-end min-w-[150px] -space-x-2 overflow-hidden'>
        {subImages.map((image, key) =>
          <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={image} alt="" key={key} />)}
        <div className='flex h-8 w-8 rounded-full ring-2 ring-white bg-[#3598DB] text-white font-medium text-center justify-center items-center'>{extraNum}+</div>
      </div>)
  }
  else {
    display = (
      <div className='flex justify-end min-w-[150px] -space-x-2 overflow-hidden'>
        {
          images.map((image, key) =>
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={image} alt="" key={key} />)
        }
      </div>
    )
  }
  return (
    <>
      {
        display
      }
    </>
  )
}

export default DisplayImage