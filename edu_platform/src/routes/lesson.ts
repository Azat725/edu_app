import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/lessons/:id", async (req, res) => {
  const id = Number(req.params.id);

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      module: {
        include: {
          course: {
            include: {
              modules: {
                orderBy: { order: "asc" },
                include: {
                  lessons: {
                    orderBy: { order: "asc" }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  if (!lesson) return res.status(404).json({ message: "Урок не найден" });

  res.json(lesson);
});

export default router;
