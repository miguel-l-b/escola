import { useEffect, useState } from "react";
import Button from "../components/Button";
import ICourse from "../interfaces/course";
import { BiSolidTrashAlt } from "react-icons/bi";
import Card from "../components/Card";
import Course from "../api/models/course";

export default function Courses() {
  const [courses, setCourses] = useState<Array<ICourse>>([]);
  const [newCourse, setNewCourse] = useState<Partial<Omit<ICourse, "id">>>();

  async function getCourse() {
    await Course.getAll()
      .then(e => setCourses(e))
      .catch(_err => alert("erro de conexão!"))
  }

  useEffect(() => {
    getCourse()
  }, [])

  function change(e: Partial<Omit<ICourse, "id">>) {
    setNewCourse({
      ...newCourse,
      ...e
    })
  }

  return( 
    <>
      <form className="flex flex-col w-1/2 m-auto items-center gap-4" onSubmit={(e) => e.preventDefault()}>
        <input 
          type="text" placeholder="Nome" className="max-w-md w-full h-fit py-1 px-3 rounded-lg"
          value={newCourse?.name} onChange={(e) => change({ name: e.target.value })}
        />
        <select
          required className="max-w-md w-full h-fit py-1 px-3 rounded-lg"
          defaultValue={0} value={newCourse?.period === ""? 0 : newCourse?.period} onChange={(e) => change({ period: e.target.value })}
        >
          <option value={0} disabled selected hidden>Selecione um Período</option>
          <option value={"mat"}>Matutino</option>
          <option value={"vesp"}>Vespertino</option>
          <option value={"not"}>Noturno</option>
        </select>
        <div className="flex gap-4 items-center justify-center max-w-md w-full h-fit py-1 px-3 rounded-lg">
          <h1>Integrado: </h1>
          <div className="flex gap-2 items-center">
            <label htmlFor="int_yes">Sim</label>
            <input
              type="radio" id="int_yes" name="int" value={1}
              checked={newCourse?.integrated} onClick={(e) => change({ integrated: true })}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="int_no">Não</label>
            <input
            type="radio" id="int_no" name="int" value={0}
            checked={newCourse?.integrated === false}  onClick={(e) => change({ integrated: false })}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="max-w-md w-full bg-green-400 hover:bg-green-100 hover:text-green-500"
          onClick={() => {
            console.log(newCourse)
            if(!newCourse || !newCourse.name || !newCourse.period || newCourse.integrated === undefined) return alert("Preencha todos os campos!")
            Course.create(newCourse as ICourse)
              .then(() => {
                setNewCourse({
                  name: "",
                  period: "",
                  integrated: undefined
                })
                getCourse()
              })
              .catch(() => alert("Erro ao criar curso!"))
          }}
        >
          Criar
        </Button>
      </form>

      <h2 className="text-center mt-8 mb-4 font-light text-xl text-gray-600">Lista de Cursos</h2>
      <div className="flex flex-col h-auto gap-5 justify-center items-center">
        {
          courses?.map((course, key) => ( 
            <Card.root key={key} className="flex items-center w-full md:w-3/4 lg:w-[40rem] h-fit">
              <div className="flex items-center justify-between w-full mr-5">
                <h1>{course.name}</h1>
                <h1>{course.period}</h1>
                <h1>{course.integrated ? "Integrado ao E.M." : "Concomitância externa"}</h1>
              </div>
                <Button className="bg-red-500 hover:bg-red-100 hover:text-red-600" onClick={() => {
                  if(!window.confirm("Tem certeza que deseja deletar este curso?")) return
                  Course.delete(course.id)
                    .then(() => getCourse())
                    .catch(() => alert("Erro ao deletar curso!"))
                }}><BiSolidTrashAlt size={24} /></Button>
            </Card.root>
          ))
        }
      </div>
    </>
  )
}