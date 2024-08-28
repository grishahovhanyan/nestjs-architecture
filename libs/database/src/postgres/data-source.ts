import 'dotenv/config'
import { DataSource } from 'typeorm'
import { POSTGRES_CONFIGS } from './config'

export default new DataSource(POSTGRES_CONFIGS)
