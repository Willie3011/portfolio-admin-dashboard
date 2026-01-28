import React from 'react'

function Button({name, icon:Icon, onClick}) {
  return (
      <button onClick={onClick} className="flex items-center px-8 py-4 rounded-lg bg-accent text-white font-medium hover:bg-amber-400 transition duration-300 ease-in-out hover:-translate-y-1 cursor-pointer">
          {Icon}
          {name}
      </button>
  )
}

export default Button