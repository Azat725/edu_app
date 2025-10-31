import { useState } from "react";

export default function OpenAnswerQuestion({ question }: { question: any }) {
  const [value, setValue] = useState("");

  async function submit() {
    await fetch(`http://localhost:3000/api/questions/${question.id}/answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ text: value }),
    });

    alert("Ответ отправлен ✅");
    setValue("");
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm space-y-3">
      <p className="font-medium text-lg">{question.text}</p>

      <textarea
        className="w-full border rounded-xl p-3"
        placeholder="Ваш ответ..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button
        onClick={submit}
        className="px-4 py-2 bg-[#007AFF] text-white rounded-xl"
      >
        Отправить
      </button>
    </div>
  );
}
