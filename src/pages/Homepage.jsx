import { useEffect, useState } from 'react'
import Cards from '../components/Cards'
import AboutEditor from '../components/AboutEditor'
import axios from 'axios';

function Homepage() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const endpoints = [
          `${import.meta.env.VITE_API_URL}/projects`,
          `${import.meta.env.VITE_API_URL}/skills`,
          `${import.meta.env.VITE_API_URL}/socials`,
        ]

        const [projectsResponse, skillsResponse, socialsResponse] = await Promise.all([
          axios.get(endpoints[0]),
          axios.get(endpoints[1]),
          axios.get(endpoints[2]),
        ])

        setProjects(projectsResponse.data.projects.data);
        setSkills(skillsResponse.data.data);
        setSocials(socialsResponse.data.data)

        
      } catch (error) {
        console.log("Error fetching about data: ", error)
      }
    }
    
    fetchAllData();
  }, [])

  return (
    <section className='grid grid-cold-12 gap-6'>
      {/*Stats*/}
      <div className="col-span-12">
        <Cards projects={projects} skills={skills} socials={socials} />
      </div>

      {/* About me section */}
      <AboutEditor/>
    </section>
  )
}

export default Homepage