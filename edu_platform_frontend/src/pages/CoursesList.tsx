import { useEffect, useState } from "react";
import Card from "../components/Card";
import type { Course } from "../types/course";

export default function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
        fetch("http://localhost:3000/api/courses")
        .then((r) => r.json())
        .then(setCourses);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Курсы</h1>

      {courses.map((course) => (
        <Card key={course.id}>
          <div>
            <h2 className="text-lg font-semibold">
                {course.title}
            </h2>

            <p className="text-sm text-gray-600">
                {course.description}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
