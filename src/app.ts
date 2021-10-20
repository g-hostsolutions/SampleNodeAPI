import * as express from "express"
import * as logger from 'morgan'
import initRoutes from './config/init/routes'

const app = express()

initRoutes(app)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((_, res: express.Response) => {
  res.status(400).send({ status: false, message: 'Not Found' })
})
export default app