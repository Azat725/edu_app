import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../components/Card";

interface Lesson {
    id: number;
    title: string;
    order: number;
}

interface Module {
    id: number;
    title: string;
    order: number;
    lessons: Lesson[];
}

interface Course {
    id: number;
    title: string;
    description?: string;
    modules: Module[];
}

export default function CoursePage() {
    const {id} = useParams();
    const [course, setCourse] = useState<Course | null>(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/courses/${id}`)
            .then((r) => r.json())
            .then(setCourse);
    }, [id]);

    if (!course) {
        return <div className="p-8">Загрузка....</div>
    }

    return (
        <div className="max-w-3xl mx-auto p-8 space-y-6">
            <h1 className="text-3xl font-bold">
                {course.title}
            </h1>
            <p className="text-gray-600">
                {course.description}
            </p>

            {course.modules.map((module) => (
                <Card key={module.id}>
                  <h2 className="text-xl font-semibold mb-3">
                    {module.order}. {module.title}
                  </h2>

                  <div className="space-y-2">
                    {module.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        to={`/lesson/${lesson.id}`}
                        className="block p-3 rounded-xl hover:bg-gray-100 transition"
                      >
                        {module.order}.{lesson.order} {lesson.title}
                      </Link>
                    ))}
                  </div>
                </Card>
            ))}
        </div>
    );
}