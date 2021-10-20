import * as acronym from '../../controllers/acronym'
import configResponse from '../utils'

const initialRoutes = (app: any) => {
  // acronym
  app.get("/acronym", acronym.get, configResponse);
};

export default initialRoutes
