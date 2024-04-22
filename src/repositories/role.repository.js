module.exports = ({ roleModel }) => {
  const getAllRoles = async (query) => {
    const { search, sort = '-createdAt', limit = 10, skip = 0 } = query;
    const filter = {};

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [{ name: regex }];
    }

    const [roles, count] = await Promise.all([
      roleModel.find(filter).sort(sort).skip(skip).limit(limit),
      roleModel.find(filter).countDocuments(),
    ]);

    return { count, roles };
  };

  const getRoleByUniqueField = async (field, value) => {
    return await roleModel.findOne({ [field]: value });
  };

  const getRoleById = async (id) => {
    return await roleModel.findById(id);
  };

  const createRole = async (data) => await roleModel.create(data);

  const updateRoleById = async (id, data) => {
    return await roleModel.findByIdAndUpdate(id, data, { new: true });
  };

  const deleteRole = async (id) => {
    return await roleModel.findByIdAndDelete(id);
  };

  return {
    getAllRoles,
    getRoleByUniqueField,
    getRoleById,
    createRole,
    updateRoleById,
    deleteRole,
  };
};
