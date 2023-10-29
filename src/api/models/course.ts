import baseConnection from "../baseConnection"
import ICourse from "../../interfaces/course"
export default class Course {
  static base_connection = baseConnection;
  static async getAll() {
    return await Course.base_connection.get("/course/getall").then((res) => {
      return res.data.map((e: any) => {
          return { 
            id: e.id,
            name: e.name,
            period: e.period === "vesp"? 
              "vespertino" :
            e.period === "not"?
              "noturno" :
              "matutino",
            integrated: e.integrated === "1"? true : false
          }
      }
      ) as ICourse[];
    })
    .catch((err) => {
      throw new Error("Erro de conexão '-'")
    });
  }

  static async create(student: Omit<ICourse, "id">) {
    return await Course.base_connection.post("/course/post", {
      id: 0,
      name: student.name,
      period: student.period,
      integrated: student.integrated? "1" : "0"
    }).then((res) => {
      return res.data as ICourse;
    }
    ).catch((err) => {
      throw new Error("Erro de conexão '-'")
    });
  }

  static async delete(id: number) {
    return await Course.base_connection.delete("/course/delete/" + id).then((res) => {
      return res.data as ICourse;
    }).catch((err) => {
      throw new Error("Erro de conexão '-'")
    });
  }
}