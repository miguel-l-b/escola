import { useEffect, useState } from "react"
import Button from "../components/Button"
import Card from "../components/Card"
import { BiSolidEditAlt, BiSolidTrashAlt } from "react-icons/bi"
import { TbEyeSearch } from "react-icons/tb"
import Student from "../interfaces/student"

export default function Students() {
  const [students, setStudents] = useState<Array<Student>>([
    { id: 1, avatar: "/unicamp.webp", name: "Kauan Piacente", ra: "22316", idCourse: "DS39" },
    { id: 2, avatar: "/unicamp.webp", name: "Miguel Lopes", ra: "22327", idCourse: "DS39" },
    { id: 3, avatar: "/unicamp.webp", name: "Agatha", ra: "22310", idCourse: "DS39" },
    { id: 4, avatar: "/unicamp.webp", name: "Bruno Concli", ra: "22300", idCourse: "DS39" },
    { id: 5, avatar: "/unicamp.webp", name: "Gustavo Miguel", ra: "22315", idCourse: "DS39" },
  ])

  const [filteredStudents, setFilteredStudents] = useState<Array<Student>>(students)

  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    if(search === "") return setFilteredStudents(students)

    const filteredStudents = students.filter( student =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.ra.toLowerCase().includes(search.toLowerCase()) ||
      student.idCourse.toLowerCase().includes(search.toLowerCase())
    )

    setFilteredStudents(filteredStudents)
  }, [search, students])

  return (
    <>
      <h2 className="text-center mb-4 font-light text-xl text-gray-600">Adicionar Aluno</h2>
      <form className="m-auto w-1/2 flex flex-col justify-center gap-8 mb-8" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Nome" className="w-full h-fit py-1 px-3 rounded-lg" />
        <input type="text" placeholder="Curso" className="w-full h-fit py-1 px-3 rounded-lg" />
        <input type="url" placeholder="Foto" className="w-full h-fit py-1 px-3 rounded-lg" />
        <Button type="submit" className=" bg-green-400 hover:bg-green-100 hover:text-green-500">Criar</Button>
      </form>

      <h2 className="text-center mb-4 font-light text-xl text-gray-600">Lista de Alunos</h2>
      <form className="w-full flex justify-center gap-8 mb-8" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Search..." className="w-96 h-fit py-1 px-3 rounded-lg" value={search} onChange={(e) =>  setSearch(e.target.value)} />
        <Button type="submit" className={`${search !== ""? "top-0 opacity-100" : "duration-100 ease-out top[-2rem] opacity-0"} bg-orange-300 hover:bg-orange-100 hover:text-orange-500`} onClick={() => setSearch("")}>Limpar Busca</Button>
      </form>
      <div className="flex flex-col h-auto gap-5 justify-center items-center">
        {
          filteredStudents?.map((student, key) => ( 
            <Card.root className="flex items-center justify-between w-full md:w-3/4 lg:w-[40rem] h-fit">
              <div className="flex items-center gap-5">
                <img src={student.avatar} className="w-12 h-14" alt={`picture of ${student.name}`} />
                <h1>{student.name}</h1>
                <h1>{student.ra}</h1>
              </div>
              <div className="flex gap-2">
                <Button><TbEyeSearch size={24} /></Button>
                <Button className="bg-yellow-500 hover:bg-yellow-100 hover:text-yellow-600"><BiSolidEditAlt size={24} /></Button>
                <Button className="bg-red-500 hover:bg-red-100 hover:text-red-600"><BiSolidTrashAlt size={24} /></Button>
              </div>
            </Card.root>
          ))
        }
      </div>
    </>
  )
}