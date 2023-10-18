import React from "react"

export interface RootProps {
  children: React.ReactNode;
}
export default function Root({ children }: RootProps) {
  return (
    <header className="pt-20 px-24">
      <nav className="bg-gray-200 min-h-[4rem] 
drop-shadow-xl px-10 flex justify-between items-center rounded-full">
        {children}
      </nav>
    </header>
  );
}