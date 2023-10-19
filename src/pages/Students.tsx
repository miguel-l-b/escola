import Button from "../components/Button"
import Card from "../components/Card"
import { BiSolidEditAlt, BiSolidTrashAlt } from "react-icons/bi"
import { TbEyeSearch } from "react-icons/tb"

export default function Students() {
  return (
    <>
      <Card.root className="flex items-center h-fit gap-2">
        <img src="/unicamp.webp" className="w-12 h-14" alt="" />
          <h1>{"{ nome }"}</h1>
          <h1>{"{ ra }"}</h1>
          <Button><TbEyeSearch size={24} /></Button>
          <Button className="bg-yellow-500 hover:bg-yellow-100 hover:text-yellow-600"><BiSolidEditAlt size={24} /></Button>
          <Button className="bg-red-500 hover:bg-red-100 hover:text-red-600"><BiSolidTrashAlt size={24} /></Button>
      </Card.root>
    </>
  )
}