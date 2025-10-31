interface Props {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
}

export default function Button({children, onClick, type="button"}: Props) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="px-5 py-2.5 bg-[#007AFF] text-white rounded-xl font-medium active:opacity-80 transition"
        >
            {children}
        </button>
    );
}