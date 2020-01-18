import React, { useEffect, useState } from 'react';

const DevForm = ({ onSubmit }) => {
  const [githubUsername, setGithubUsername] = useState('')
  const [techs, setTechs] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const handleChange = (e, fn) => {
    return fn(e.target.value)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLatitude(latitude)
        setLongitude(longitude)
      },
      (err) => {
        console.log(err)
      },
      {
        timeout: 30000
      }
    )
  }, [])

  const handleAddDev = async (e) => {
    e.preventDefault()

    await onSubmit({
      github_username: githubUsername,
      techs,
      latitude,
      longitude
    })

    setTechs('')
    setGithubUsername('')
  }

  return (
    <form onSubmit={handleAddDev}>
      <div className="input-block">
        <label htmlFor="github_username">Usúario do Github</label>
        <input
          name="github_username"
          id="github_username"
          type="text"
          required
          value={githubUsername}
          onChange={(e) => handleChange(e, setGithubUsername)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          name="techs"
          id="techs"
          type="text"
          required
          value={techs}
          onChange={(e) => handleChange(e, setTechs)}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latidude">Latitude</label>
          <input
            type='number'
            name="latidude"
            id="latidude"
            value={latitude}
            onChange={(e) => handleChange(e, setLatitude)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type='number'
            name="longitude"
            id="longitude"
            value={longitude}
            onChange={(e) => handleChange(e, setLongitude)}
          />
        </div>
      </div>

      <button type="submit">Enviar</button>
    </form>
  )
};

export default DevForm;
