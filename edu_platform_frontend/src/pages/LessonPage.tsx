import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import OpenAnswerQuestion from "../components/OpenAnswerQuestion";

export default function LessonPage() {
  const { id } = useParams();
  const [lesson, setLesson] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/lessons/${id}`)
      .then((r) => r.json())
      .then(setLesson);
  }, [id]);

  if (!lesson) return <div className="p-8">Загрузка...</div>;

  const course = lesson.module.course;
  const modules = course.modules;

  return (
    <div className="flex min-h-screen bg-[#F2F3F5]">
      <aside className="w-72 border-r bg-white p-4 space-y-4 overflow-y-auto">
        <h2 className="font-semibold text-lg">{course.title}</h2>

        {modules.map((m: any) => (
          <div key={m.id} className="space-y-1">
            <h3 className="text-sm font-medium text-gray-600 mt-4 mb-1">
              {m.order}. {m.title}
            </h3>

            {m.lessons.map((l: any) => (
              <Link
                key={l.id}
                to={`/lesson/${l.id}`}
                className={
                  "block px-3 py-2 rounded-lg text-sm transition " +
                  (l.id === lesson.id
                    ? "bg-[#007AFF] text-white"
                    : "hover:bg-gray-100")
                }
              >
                {m.order}.{l.order} {l.title}
              </Link>
            ))}
          </div>
        ))}
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>

        <article
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />

        {lesson.questions && lesson.questions.length > 0 && (
          <div className="mt-10 space-y-6">
            <h2 className="text-2xl font-semibold">Проверка понимания</h2>
            {lesson.questions.map((q: any) => (
              <OpenAnswerQuestion key={q.id} question={q} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
