const prisma = require("./prismaClient");

const queries = {
  findAll: async (model, options = {}) => {
    return await prisma[model].findMany(options);
  },
  findById: async (model, id, includeOptions = {}) => {
    return await prisma[model].findUnique({
      where: { id },
      include: includeOptions, // By default, it includes nothing
    });
  },
  findByName: async (model, name = {}) => {
    return await prisma[model].findUnique({
      where: { name },
    });
  },
  create: async (model, data) => {
    return await prisma[model].create({ data });
  },
  update: async (model, id, data) => {
    return await prisma[model].update({ where: { id }, data });
  },
  delete: async (model, id) => {
    return await prisma[model].delete({ where: { id } });
  },
  count: async (model, options = {}) => {
    return await prisma[model].count(options);
  },
  deactivate: async (model, id) => {
    return await prisma[model].update({
      where: { id },
      data: { status: false },
    });
  },
  activate: async (model, id) => {
    return await prisma[model].update({
      where: { id },
      data: { status: true },
    });
  },
  findStatus: async (model, status) => {
    console.log(`Querying ${model} with status:`, status);

    const query = status !== null ? { where: { status } } : {};
    const result = await prisma[model].findMany(query);
    console.log(`Results for status ${status}:`, result);
    return result;
  },
};

module.exports = queries;

// prisma[model]: accessing a Prisma dynamic property
