import { Router } from "express";
import { prisma } from "../lib/prisma"
import { auth, AuthedRequest} from '../middlewares/auth';

const router = Router();

router.post('/courses/:courseId/modules', auth("teacher"), async (req: AuthedRequest, res) => {
    const { title } = req.body;
    const courseId = Number(req.params.courseId);

    const lastModule = await prisma.module.findFirst({
        where: {
            courseId,
        },
        orderBy: {
            order: "desc",
        }
    });

    const order = lastModule ? lastModule.order + 1 : 1;

    const module = { 
        data: {
            title,  
            order,
            courseId
        }
    };

    res.json(module);
});

export default router;