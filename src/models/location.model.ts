import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

class Location extends Model {
  public id_location!: number
  public latitud!: number
  public longitud!: number
}

Location.init(
  {
    id_location: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    latitud: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    longitud: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'locations',
    modelName: 'Locations',
  },
)

export default Location
