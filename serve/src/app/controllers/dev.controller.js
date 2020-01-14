import github from '../../services/github'
import Dev from '../models/dev.model'
import parseStringAsArray from '../../utils/parseStringAsArray'

export default {
  async index(req, res) {
    const devs = await Dev.find()

    res.json(devs)
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body

    let dev = await Dev.findOne({ github_username })

    if (!dev) {
      const { data } = await github.get(`/${github_username}`)
      const { name = login, avatar_url, bio } = data

      const techsArray = parseStringAsArray(techs)

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create({
        name,
        github_username,
        bio,
        avatar_url,
        techs: techsArray,
        location
      })
    }

    res.json(dev)
  }
}