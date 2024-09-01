import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BackProject from '../components/BackProject'
import DeleteProject from '../components/DeleteProject'
import ProjectBackers from '../components/ProjectBackers'
import ProjectDetails from '../components/ProjectDetails'
import UpdateProject from '../components/UpdateProject'
import { getBackers, loadProject } from '../services/blockchain'
import { useGlobalState } from '../store'

const Project = () => {
  const { id } = useParams()
  const [loaded, setLoaded] = useState(false)
  const [project, setProject] = useGlobalState('project')
  const [backers, setBackers] = useGlobalState('backers')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadProject(id)
        await getBackers(id)
        setLoaded(true)
      } catch (error) {
        console.error('Error loading project:', error)
        setError('Failed to load project. Please try again later.')
      }
    }
    fetchData()
  }, [id])

  return (
    <>
      {error && <div className="error-message">{error}</div>}
      {loaded && !error && (
        <>
          <ProjectDetails project={project} />
          <UpdateProject project={project} />
          <DeleteProject project={project} />
          <BackProject project={project} />
          <ProjectBackers backers={backers} />
        </>
      )}
    </>
  )
}

export default Project
