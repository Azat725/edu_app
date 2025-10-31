import { Router } from "express";
import { prisma } from "../lib/prisma"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { auth, AuthedRequest } from "../middlewares/auth";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, fullName } = req.body ?? {};
        if (!email || !password || !fullName) {
          return res.status(400).json({ 
            message: "email, password, fullName обязательны" 
        });
    }

    const existing = await prisma.user.findUnique({ 
        where: { email } 
    });

    if (existing) {
      return res.status(400).json({ 
        message: "Пользователь с такой эл.почтой уже существует" 
    });
    }

    const role = await prisma.role.findUnique({ 
        where: { 
            name: "student" 
        } 
    });

    if (!role) {
        return res.status(500).json({ 
          message: "Роль student не найдена" 
        });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { 
            email, 
            fullName, 
            passwordHash, 
            roleId: role.id 
        },
    });

    return res.json({
        message: "Регистрация успешна",
        user: { 
            id: user.id, 
            email: user.email 
        },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ 
        message: "Внутренняя ошибка сервера" 
    });
  }
});

// Вход
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) {
        return res.status(400).json({ 
            message: "email и password обязательны" 
        });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
    if (!user) {
        return res.status(401).json({ 
            message: "Неверный логин или пароль" 
        });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: "Неверный логин или пароль" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role.name },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Вход выполнен",
      token,
      user: { id: user.id, email: user.email, role: user.role.name },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});

router.get("/me", auth(), async (req: AuthedRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: { role: true },
    });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role.name,
      createdAt: user.createdAt,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});

export default router;
