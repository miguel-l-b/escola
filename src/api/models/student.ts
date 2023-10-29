import baseConnection from "../baseConnection"
import IStudent from "../../interfaces/student"
export default class Student {
  static base_connection = baseConnection;
  static async getAll() {
    return await Student.base_connection.get("/student/getall").then((res) => {
      return res.data as IStudent[];
    })
    .catch((err) => {
      throw new Error("Erro de conexão '-'")
    });
  }

  static async create(student: Omit<IStudent, "id">) {
    return await Student.base_connection.post("/student/post", { id: 0, ...student}).then((res) => {
      return res.data as IStudent;
    }
    ).catch((err) => {
      throw new Error("Erro de conexão '-'")
    });
  }

  static async update(student: IStudent) {
    return await Student.base_connection.put("/student/put", student).then((res) => {
      return res.data as IStudent;
    }
    ).catch((err) => {
      throw new Error("Erro de conexão '-'")
    });
  }

  static async delete(id: number) {
    return await Student.base_connection.delete("/student/delete/" + id).then((res) => {
      return res.data as IStudent;
    }).catch((err) => {
      throw new Error("Erro de conexão '-'")
    });
  }
}