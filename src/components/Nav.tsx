"use client";
interface NavProps {
  handleClick: () => void;
}
export default function Nav({ handleClick }: NavProps) {
  return (
    <header className="p-8 w-fit absolute z-10 left-0 top-0 flex items-center gap-4 md:hover:underline">
      <button onClick={handleClick}>About</button>
    </header>
  );
}
