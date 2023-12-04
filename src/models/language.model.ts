import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

class Language extends Model {
  public id_idioma!: number
  public language!: string
}

Language.init(
  {
    id_language: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Language',
    tableName: 'languages',
  },
)

export default Language
