export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6 bg-white shadow-sm">
      {children}
    </div>
  );
}
