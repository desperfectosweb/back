import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

class Photo extends Model {
  public id_photo!: number
  public url_imagen!: string
  public descripcion?: string
}

Photo.init(
  {
    id_photo: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    url_imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'photos',
    modelName: 'Photos',
  },
)

export default Photo
