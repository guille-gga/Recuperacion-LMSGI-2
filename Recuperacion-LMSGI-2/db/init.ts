import { Database } from "bun:sqlite"

const initDB = async () => {
  const schema = await Bun.file("db/schema.sql").text()
  const db = new Database("db/db.sqlite")
  const query = db.query(schema)
  query.run()
  const mensajes = db.query("SELECT * FROM mensajes").all()
  if (mensajes.length === 0) {
    db.query("INSERT INTO mensajes (user, content) VALUES ('admin', 'Hola mundo!')").run()
  }
  return db
}

export const db = await initDB()
