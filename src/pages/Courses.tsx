import Button from "../components/Button";

export default function Courses() {
  return( 
    <>
      <form className="flex flex-col w-1/2 m-auto items-center gap-4">
        <input type="text" placeholder="Nome" className="max-w-md w-full h-fit py-1 px-3 rounded-lg" />
        <select required className="max-w-md w-full h-fit py-1 px-3 rounded-lg">
          <option disabled selected hidden>Período</option>
          <option value={1}>Matutino</option>
          <option value={2}>Vespertino</option>
          <option value={3}>Noturno</option>
        </select>
        <div className="flex gap-4 items-center justify-center max-w-md w-full h-fit py-1 px-3 rounded-lg">
          <h1>Integrado: </h1>
          <div className="flex gap-2 items-center">
            <label htmlFor="int_yes">Sim</label>
            <input type="radio" id="int_yes" name="int" value={1} />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="int_no">Não</label>
            <input type="radio" id="int_no" name="int" value={0} />
          </div>
        </div>
        <Button type="submit" className="max-w-md w-full bg-green-400 hover:bg-green-100 hover:text-green-500">Criar</Button>
      </form>

      <div className="">
        
      </div>
    </>
  )
}