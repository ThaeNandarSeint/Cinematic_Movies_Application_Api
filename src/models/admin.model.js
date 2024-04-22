const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { createCustomId } = require('../helpers');

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    adminId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      required: true,
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      required: true,
      type: String,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    avatar: {
      url: String,
      key: String,
      filename: String,
    },
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

adminSchema.pre(
  'validate',
  createCustomId({
    modelName: 'Admin',
    prefix: 'Admin',
    fieldName: 'adminId',
  })
);

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

adminSchema.pre('findOneAndUpdate', async function (next) {
  if (!this.getUpdate().password) return next();

  this.getUpdate().password = await bcrypt.hash(this.getUpdate().password, 12);
  next();
});

module.exports = mongoose.model('Admin', adminSchema, 'admins');
