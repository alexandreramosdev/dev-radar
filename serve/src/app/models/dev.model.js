import mongoose from '../../database'
import PointSchama from './utils/PointSchema'

const DevSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchama,
    index: '2dsphere'
  }
})

export default mongoose.model('Dev', DevSchema)