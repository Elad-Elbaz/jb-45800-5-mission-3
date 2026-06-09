import { Sequelize } from "sequelize-typescript";
import config from 'config'
import Meeting from "../models/Meeting";
import Team from "../models/Team";

const sequelize = new Sequelize({
    dialect: 'mysql',
    models: [Team,Meeting],
    logging: console.log,
    ...config.get('db')
})

console.log(`connected to database on `, config.get('db'))

export default sequelize