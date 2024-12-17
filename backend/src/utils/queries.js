const prisma = require("./prismaClient");

const queries = {
  findMany: async (model, options = {}) => {
    return await prisma[model].findMany(options);
  },
  findById: async (model, id, includeOptions = {}) => {
    return await prisma[model].findUnique({
      where: { id },
      include: includeOptions, // By default, it includes nothing
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
    return await prisma[model].findMany({ where: { status } }); // // Prisma expects a boolean here
  },
};

module.exports = queries;

// prisma[model]: accessing a Prisma dynamic property
