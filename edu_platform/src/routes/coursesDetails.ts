import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/courses/:id", async(req, res) => {
    const id = Number(req.params.id);

    const course = await prisma.course.findUnique({
        where: {
            id
        },
        include: {
            teacher: true,
            modules: {
                orderBy: {
                    order: "asc",
                },
                include: {
                    lessons: {
                        orderBy: {
                            order: "asc"
                        }
                    }
                }
            }
        }
    });

    if (!course) {
        return res.status(404).json({
            message: "Курс не найден",
        });
    }
});

export default router;