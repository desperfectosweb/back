import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import User from './user.model'
import Location from './location.model'
import Photo from './photo.model'

class Report extends Model {
  public id_report!: number
  public id_user!: number
  public dateTime!: Date
  public description!: string
  public status!: string
  public id_location!: number
  public id_photo!: number
}

Report.init(
  {
    id_report: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: 'id_user',
      },
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_location: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Location,
        key: 'id_location',
      },
    },
    id_photo: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Photo,
        key: 'id_photo',
      },
    },
  },
  {
    tableName: 'reportes',
    sequelize,
  },
)

export default Report
