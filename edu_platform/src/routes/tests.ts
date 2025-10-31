import { Router } from "express";
import { prisma } from "../lib/prisma";
import { auth, AuthedRequest } from "../middlewares/auth";

const router = Router();

router.post("/lessons/:lessonId/questions", auth("teacher"), async (req: AuthedRequest, res) => {
    const { lessonId } = req.params;
    const { text } = req.body;

    const question = await prisma.quizQuestion.create({
        data: {
            text,
            lessonId: Number(lessonId),
        },
    }); 

    res.json(question);
});


router.post("/lessons/:lessonId/answer", auth("student"), async (req: AuthedRequest, res) => {
    const { questionId } = req.params;
    const { text } = req.body;

    const answer = await prisma.quizAnswer.create({
        data: {
            text,
            questionId: Number(questionId),
            studentId: req.user!.id,
        },
    }); 

    res.json({ message: "Ответ сохранён", answer });
});

export default router;