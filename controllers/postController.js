import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPostsFull = async (_req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: { name: true, email: true }
        },
        categories: {
          select: { name: true }
        }
      }
    });

    return res.json(posts);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export const addCategoryToPost = async (req, res) => {
  const { postId, categoryId } = req.body;

  if (!postId || !categoryId) {
    return res.status(400).json({
      error: 'Fields postId and categoryId are required'
    });
  }

  try {
    const updatedPost = await prisma.post.update({
      where: { id: Number(postId) },
      data: {
        categories: {
          connect: { id: Number(categoryId) }
        }
      },
      include: { categories: true }
    });

    return res.json(updatedPost);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Field name is required' });
  }

  try {
    const category = await prisma.category.create({
      data: { name }
    });

    return res.status(201).json(category);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
