import React, { useEffect } from 'react'
import AddButton from '../components/AddButton'
import CreateProject from '../components/CreateProject'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import { loadProjects } from '../services/blockchain'
import { useGlobalState } from '../store'

const Home = () => {
  const [projects] = useGlobalState('projects')

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadProjects()
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Hero/>
      <Projects projects={projects} />
      <CreateProject />
      <AddButton />
    </>
  )
}

export default Home