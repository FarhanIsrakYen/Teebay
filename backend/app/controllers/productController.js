import prisma from "@prisma/client";

const prismaClient = new prisma.PrismaClient();

export const productController = {
  createProduct: async (_, { title, description, category, isAvailable, ownerId, status }) => {
    const product = await prismaClient.product.create({
      data: {
        title,
        description,
        category,
        isAvailable,
        ownerId,
        status,
      },
    });

    return product;
  },

  updateProduct: async (_, { id, title, description, isAvailable }, { userId }) => {
    const product = await prismaClient.product.findUnique({ where: { id: parseInt(id) } });
    if (product.ownerId !== userId) throw new Error("Unauthorized");

    return prismaClient.product.update({
      where: { id: parseInt(id) },
      data: { title, description, isAvailable },
    });
  },

  deleteProduct: async (_, { id }, { userId }) => {
    const product = await prismaClient.product.findUnique({ where: { id: parseInt(id) } });
    if (product.ownerId !== userId) throw new Error("Unauthorized");

    await prismaClient.product.delete({ where: { id: parseInt(id) } });
    return true;
  },

  buyProduct: async (_, { id }, { userId }) => {
    const product = await prismaClient.product.findUnique({ where: { id: parseInt(id) } });
    if (!product.isAvailable) throw new Error("Product is not available for buying");

    return prismaClient.product.update({
      where: { id: parseInt(id) },
      data: { isAvailable: false, status: "BUY", ownerId: userId },
    });
  },

  rentProduct: async (_, { id }, { userId }) => {
    const product = await prismaClient.product.findUnique({ where: { id: parseInt(id) } });
    if (!product.isAvailable) throw new Error("Product is not available for renting");

    return prismaClient.product.update({
      where: { id: parseInt(id) },
      data: { isAvailable: false, status: "RENT", ownerId: userId },
    });
  },
};
