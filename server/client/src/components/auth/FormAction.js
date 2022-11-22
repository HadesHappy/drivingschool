export default function FormAction({
  handleClick,
  type = 'Button',
  action = 'submit',
  text
}) {
  return (
    <>
      {
        type === 'Button' ?
          <div
            type={action}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3598DB] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10 cursor-pointer"
            onClick={handleClick}
          >
            {text}
          </div>
          :
          <></>
      }
    </>
  )
}