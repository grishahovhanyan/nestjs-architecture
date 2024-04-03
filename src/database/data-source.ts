import 'dotenv/config'
import { DataSource } from 'typeorm'
import { databaseConfigs } from './config'

export default new DataSource(databaseConfigs)
