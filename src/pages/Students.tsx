/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react"
import Button from "../components/Button"
import Card from "../components/Card"
import { BiSolidEditAlt, BiSolidTrashAlt } from "react-icons/bi"
import IStudent from "../interfaces/student"
import Student from "../api/models/student"
import Course from "../api/models/course"
import ICourse from "../interfaces/course"

export default function Students() {
  const [newStudent, setNewStudent] = useState<Partial<Omit<IStudent, "id">>>()
  const [courses, setCourses] = useState<Array<ICourse>>()
  const [students, setStudents] = useState<Array<IStudent>>([])
  const [filteredStudents, setFilteredStudents] = useState<Array<IStudent>>(students)

  const [ediding, setEditing] = useState<number>()
  const [search, setSearch] = useState<string>("")
  
  const [annimation, setAnnimation] = useState<string>("opacity-0 top-[-20vh]")

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

  useEffect(() => {
    if(!ediding)
      setAnnimation("opacity-0 top-[-20vh]")
    else
      setTimeout(() => setAnnimation("opacity-100 top-0"), 100)
  }, [ediding])

  function change(e: Partial<IStudent>) {
    setNewStudent({...newStudent, ...e})
  }

  useEffect(() => {
    if(search === "") return setFilteredStudents(students)

    const filteredStudents = students.filter( student =>
      student.name?.toLowerCase().includes(search.toLowerCase()) ||
      student.ra.toLowerCase().includes(search.toLowerCase())
    )

    setFilteredStudents(filteredStudents)
  }, [search, students])

  return (
    <>
      <span className={`${ediding? "left-0" : "left-[-100vw]"} absolute top-0 opacity-40 bg-gray-900 w-screen h-screen`}></span>
      <div id="myModal" className={`${ediding? annimation : "hidden"} duration-500 ease-out modal fixed inset-0 flex items-center justify-center z-50`}>
        <form className="flex items-center flex-col gap-5 modal-content w-2/3 bg-gray-100 rounded-xl shadow-lg p-5"  onSubmit={(e) => e.preventDefault()}>
          <input type="text" required placeholder="Nome" className="w-full h-fit py-1 px-3 rounded-lg" value={newStudent?.name} onChange={(e) => change({ name: e.target.value })} />
          <input type="text" required placeholder="RA" className="w-full h-fit py-1 px-3 rounded-lg" value={newStudent?.ra} onChange={(e) => change({ ra: e.target.value })} />
          <select className="w-full h-fit py-1 px-3 rounded-lg" defaultValue={0} value={newStudent?.idCourse} onChange={(e) => change({idCourse: Number(e.target.value)})}>
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
          <input type="url" required placeholder="Foto" className="w-full h-fit py-1 px-3 rounded-lg" value={newStudent?.avatar} onChange={(e) => change({ avatar: e.target.value })} />
          <div className="w-full">
          <Button className="w-1/5 mt-3 text-center" onClick={() => {
            if(newStudent && newStudent.avatar && newStudent.idCourse && newStudent.name && newStudent.ra) {
            if(newStudent.ra.length !== 5)
              return alert("RA deve ter no máximo 5 caracteres!")
            if(!window.confirm("Tem certeza que deseja editar esse aluno?")) return
            Student.update({id: ediding, ...newStudent} as IStudent)
              .then(() => {
                setNewStudent({})
                getStudents()
                setEditing(undefined)
              })
              .catch(_err => alert("erro de conexão!"))
          } else alert("preencha todos os campos!")
          }}>Editar</Button>
          <Button className="w-1/5 mt-3 text-center float-right" onClick={() => {
            setEditing(undefined)
            setNewStudent({})
          }}>Cancelar</Button>
          </div>
        </form>
      </div>
      <h2 className="text-center mb-4 font-light text-xl text-gray-600">Adicionar Aluno</h2>
      <form className="m-auto w-1/2 flex flex-col justify-center gap-8 mb-8" onSubmit={(e) => e.preventDefault()}>
        <input type="text" required placeholder="Nome" className="w-full h-fit py-1 px-3 rounded-lg" value={!ediding? newStudent?.name : undefined} onChange={(e) => change({ name: e.target.value })} />
        <input type="text" required placeholder="RA" className="w-full h-fit py-1 px-3 rounded-lg" value={!ediding? newStudent?.ra : undefined} onChange={(e) => change({ ra: e.target.value })} />
        <select className="w-full h-fit py-1 px-3 rounded-lg" defaultValue={0} value={!ediding? newStudent?.idCourse : undefined} onChange={(e) => change({idCourse: Number(e.target.value)})}>
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
        <input type="url" required placeholder="Foto" className="w-full h-fit py-1 px-3 rounded-lg" value={!ediding? newStudent?.avatar : undefined} onChange={(e) => change({ avatar: e.target.value })} />
        <Button
          type="submit"
          className=" bg-green-400 hover:bg-green-100 hover:text-green-500"
          onClick={() => {
            if(newStudent && newStudent.avatar && newStudent.idCourse && newStudent.name && newStudent.ra) {
              if(newStudent.ra.length !== 5)
                return alert("RA deve ter no máximo 5 caracteres!")
              Student.create(newStudent as IStudent)
                .then(() => {
                  setNewStudent({
                    name: "",
                    avatar: "",
                    idCourse: 0,
                    ra: ""
                  })
                  getStudents()
                })
                .catch(_err => alert("erro de conexão!"))
            } else alert("preencha todos os campos!")
          }}
        >
          Criar
        </Button>
      </form>

      <h2 className="text-center mb-4 font-light text-xl text-gray-600">Lista de Alunos</h2>
      <form className="w-full flex justify-center gap-8 mb-8" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Search..." className="w-96 h-fit py-1 px-3 rounded-lg" value={search} onChange={(e) =>  setSearch(e.target.value)} />
        <Button
          type="submit"
          className={`${search !== ""? "opacity-100 hover:bg-orange-100 hover:text-orange-500" : "duration-100 ease-out top[-2rem] opacity-40 hover:bg-orange-300 hover:text-orange-50"}  bg-orange-300`}
          onClick={() => setSearch("")}
        >
          Limpar Busca
        </Button>
      </form>
      <div className="flex flex-col h-auto gap-5 justify-center items-center">
        {
          filteredStudents?.map((student, key) => ( 
            <Card.root key={key} className="flex items-center justify-between w-full md:w-3/4 lg:w-[40rem] h-fit">
              <div className="flex items-center gap-5">
                <img src={student.avatar} className="w-12 h-14 rounded-xl" alt={`picture of ${student.name || "[sem nome]"}`} />
                <h1>{student.name}</h1>
                <h1>{student.ra}</h1>
                <h2>{courses?.find(e => e.id === student.idCourse)?.name}</h2>
              </div>
              <div className="flex gap-2">
                <Button className="bg-yellow-500 hover:bg-yellow-100 hover:text-yellow-600" onClick={() => {
                  setEditing(student.id)
                  setNewStudent(student)
                }}><BiSolidEditAlt size={24} /></Button>
                <Button className="bg-red-500 hover:bg-red-100 hover:text-red-600" onClick={() => {
                    if(!window.confirm("Tem certeza que deseja deletar esse aluno?")) return
                      Student.delete(student.id)
                        .then(() => getStudents())
                        .catch(_err => alert("erro de conexão!"))
                  }
                }><BiSolidTrashAlt size={24} /></Button>
              </div>
            </Card.root>
          ))
        }
      </div>
    </>
  )
}