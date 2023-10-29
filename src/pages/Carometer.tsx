import { useEffect, useState } from "react"
import IStudent from "../interfaces/student"
import Student from "../api/models/student"
import Course from "../api/models/course"
import ICourse from "../interfaces/course"
import Button from "../components/Button"
import Card from "../components/Card"

export default function Carometer() {
  const [courses, setCourses] = useState<Array<ICourse>>()
  const [students, setStudents] = useState<Array<IStudent>>([])
  const [search, setSearch] = useState<number>(0)

  async function getStudents() {
    await Student.getAll()
      .then(e => setStudents(e))
      .catch(_err => alert("erro de conexão!"))
    
    await Course.getAll()
      .then(e => setCourses(e))
      .catch(_err => alert("erro de conexão!"))
  }

  useEffect(() => {
    getStudents()
  }, [])

  return( 
    <>
      <form className="w-full flex justify-center gap-8 mb-8" onSubmit={(e) => e.preventDefault()}>
      <select className="w-96 h-fit py-1 px-3 rounded-lg" defaultValue={0} value={!search? 0 : search} onChange={(e) => setSearch(Number(e.target.value))}>
          <option value={0} disabled selected hidden>Escolha um Curso</option>
          {
            courses?.map(course => (
              <option value={course.id}>{course.name} {course.period} {course.integrated? "Integrado" : "Concomitância Externa"}</option>
              ))
          }
          {
            courses?.length === 0 && <option value={0} disabled>Não existem cursos...</option>
          }
      </select>
      <Button
          type="submit"
          className={`${search !== 0? "opacity-100 hover:bg-orange-100 hover:text-orange-500" : "duration-100 ease-out top[-2rem] opacity-40 hover:bg-orange-300 hover:text-orange-50"}  bg-orange-300`}
          onClick={() => setSearch(0)}
        >
          Limpar Busca
        </Button>
      </form>
      <h1 className="text-center mt-8 mb-4 font-light text-2xl text-gray-600">Carômetro</h1>
      <div className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {
            students.filter(student => student.idCourse === search).map((student) => ( 
              <Card.root className="flex-col">
                <img className="w-48 h-56 rounded-xl" src={student.avatar} alt={"foto de"+student.name} />
                <h2 className="text-center mt-2 font-thin text-gray-700 text-lg">{student.name}</h2>
              </Card.root>
            ))
          }
      </div>
    </>
  )
}