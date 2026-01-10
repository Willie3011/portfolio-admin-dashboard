import React from 'react'
import Cards from '../components/Cards'
import AboutEditor from '../components/AboutEditor'

function Homepage() {
  return (
    <section className='grid grid-cold-12 gap-6'>
      {/*Stats*/}
      <div className="col-span-12">
        <Cards />
      </div>

      {/* About me section */}
      <AboutEditor/>
    </section>
  )
}

export default Homepage