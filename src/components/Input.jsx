import React from 'react'

function Input({label, ...props}) {
  return (
          <div>
              <label className="block mb-2 text-sm font-semibold text-primary">{label}</label>
              <input
                  {...props}
                  className="w-full p-2.5 rounded-lg bg-secondary border text-gray-700 border-primary/40"
              />
          </div>
  )
}

export default Input