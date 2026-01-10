import { Link } from 'react-router-dom'

function Card({title, icon: Icon, value, to, gradient}) {
  return (
      <Link to={to} className={`relative w-full overflow-hidden rounded-2xl p-6 bg-gradient-to-bg ${gradient} shadow-sm hover:shadow-lg transition group`}>
          {/* Icon */}
          <div className="w-10 h-10 rounded-lg bg-white/80 flex items-center justify-center">
              <Icon className="text-gray-700 w-5 h-5"/>
          </div>

          {/* Text */}
          <div className="mt-6">
              <p className='text-sm text-gray-600'>{title}</p>
              {value && (
                  <p className='text-3xl font-bold text-gray-800 mt-1'>{ value }</p>
              )}
          </div>

          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></div>
      </Link>
  )
}

export default Card