import React, { useState } from "react"
import { HiMenuAlt2 } from "react-icons/hi"

export interface RootProps {
  children: React.ReactNode;
}
export default function Root({ children }: RootProps) {
  const [isOpened, setIsOpened] = useState(false)
  return (
    <header className="md:pt-20 md:px-24 relative">
      <nav className="hidden sm:flex relative flex-row bg-gray-200 min-h-[4rem] drop-shadow-xl px-5 justify-between items-center md:rounded-full">
        {children}
      </nav>

      {/* Mobile */}
      <button className={`${isOpened? "hidden" : "fixed"} mt-4 ml-4 drop-shadow-md bg-gray-50 px-2 py-2 rounded-xl sm:hidden`} onClick={() => setIsOpened(true)}>
      <HiMenuAlt2 size={20} />
      </button>
      <span className={`${isOpened? "opacity-40" : "invisible"} sm:hidden bg-gray-900 w-screen h-screen absolute`} onClick={() => setIsOpened(false)} />
      <nav className={`sm:hidden duration-200 absolute ${!isOpened? "left-[-100vh]" : "left-0"} sm:hidden bg-gray-200 h-screen w-7/12 flex flex-col justify-between`} onClick={() => setIsOpened(false)}>
        {children}
      </nav>
    </header>
  );
}