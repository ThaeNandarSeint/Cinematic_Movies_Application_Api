module.exports = ({ adminModel }) => {
  const getAllAdmins = async (query) => {
    const { search, sort = '-createdAt', limit = 10, skip = 0 } = query;
    const filter = {};

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [{ name: regex }];
    }

    const [admins, count] = await Promise.all([
      adminModel.find(filter).sort(sort).skip(skip).limit(limit),
      adminModel.find(filter).countDocuments(),
    ]);

    return { count, admins };
  };

  const getAdminByUniqueField = async (field, value, select = '-password') => {
    return await adminModel.findOne({ [field]: value }).select(select);
  };

  const getAdminById = async (id, select = '-password') => {
    return await adminModel.findById(id).select(select);
  };

  const createAdmin = async (data) => {
    const admin = await adminModel.create(data);
    admin.password = undefined;
    return admin;
  };

  const updateAdminById = async (id, data) => {
    return await adminModel.findByIdAndUpdate(id, data, { new: true });
  };

  const deleteAdmin = async (id) => {
    return await adminModel.findByIdAndDelete(id);
  };

  return {
    getAllAdmins,
    getAdminByUniqueField,
    getAdminById,
    createAdmin,
    updateAdminById,
    deleteAdmin,
  };
};
