import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUserWithPost = async (req, res) => {
  const { name, email, postTitle } = req.body;

  if (!name || !email || !postTitle) {
    return res.status(400).json({
      error: 'Fields name, email and postTitle are required'
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        posts: {
          create: { title: postTitle }
        }
      },
      include: { posts: true }
    });

    return res.status(201).json(user);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export const getUsersWithPostCount = async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        _count: {
          select: {
            posts: true
          }
        }
      }
    });

    return res.json(users);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export const getAuthorsWithItCategory = async (_req, res) => {
  try {
    const authors = await prisma.user.findMany({
      where: {
        posts: {
          some: {
            categories: {
              some: {
                name: 'IT'
              }
            }
          }
        }
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    return res.json(authors);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
