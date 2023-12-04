import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

class User extends Model {
  public id_usuario!: number
  public nombre!: string
  public correo!: string
  public password!: string
  public id_metodo_autenticacion!: string
  public puntos_acumulados!: number
  public idioma!: string
}
User.init(
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_metodo_autenticacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    puntos_acumulados: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    idioma: {
      type: DataTypes.STRING,
      defaultValue: 'es',
    },
  },
  {
    sequelize,
    tableName: 'users', // Table name in the database
    modelName: 'User', // Model name in the code
  },
)

export default User
