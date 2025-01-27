'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MessageReaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MessageReaction.associate = (models) => {
        // A reaction belongs to one message
        MessageReaction.belongsTo(models.Message, { foreignKey: 'message_id' });
        // A reaction belongs to one user
        MessageReaction.belongsTo(models.User, { foreignKey: 'user_id' });
      };

    }
  }
  MessageReaction.init({
    message_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reaction: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['like', 'love', 'laugh', 'sad', 'angry']],
      },
    }
  }, {
    sequelize,
    modelName: 'MessageReaction',
  });
  return MessageReaction;
};