import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://devradar-admin:S2TSaFCkYRZi4ja0@devradar-mm9as.mongodb.net/devradar?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.Promise = global.Promise

export default mongoose