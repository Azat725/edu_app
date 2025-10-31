import { Router } from "express";
import { prisma } from "../lib/prisma";
import { auth, AuthedRequest } from "../middlewares/auth"; 

const router = Router();

router.post("/", auth("teacher"), async(req: AuthedRequest, res) => {
    const { title, description } = req.body;

    const course = await prisma.course.create({
        data: {
            title,
            description,
            teacherId: req.user!.id
        }
    });

    res.json(course);
});

router.get("/", async(req, res) => {
    const courses = await prisma.course.findMany({
        include: {
            teacher: true,
        },
    });

    res.json(courses);
});

export default router;