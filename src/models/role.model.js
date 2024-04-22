const mongoose = require('mongoose');
const { createCustomId } = require('../helpers');

const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    roleId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      required: true,
      type: String,
      unique: true,
    },
    permissions: [
      {
        action: [
          {
            type: String,
            required: true,
          },
        ],
        subject: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

roleSchema.pre(
  'validate',
  createCustomId({
    modelName: 'Role',
    prefix: 'Role',
    fieldName: 'roleId',
  })
);

module.exports = mongoose.model('Role', roleSchema, 'roles');
