import { db } from "./db/init"
import express from "express"
import cors from "cors"
import type { Request, Response } from "express"

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('public'))

app.get("/mensajes", (req: Request, res: Response) => {
  const mensajes = db.query("SELECT * FROM mensajes").all()
  res.json(mensajes)
})

app.post("/mensajes", (req: Request, res: Response) => {
  const { usuario, contenido, pass } = req.body
  if (!pass) {
    return res.json({ "status": "error: no enviaste pass" })
  }
  if (pass != 'plsdonthackthis') {
    return res.json({ "status": "error: contraseña erronea" })
  }
  if (!usuario) {
    return res.json({ "status": "error: no enviaste usuario" })
  }
  if (!contenido) {
    return res.json({ "status": "error: no enviaste contenido" })
  }
  const resultado = db.query("INSERT INTO mensajes (user, content) VALUES (?, ?)").run(usuario, contenido)
  const nuevo_mensaje = db.query("SELECT * FROM mensajes WHERE id = ?").get(resultado.lastInsertRowid)
  res.json({ "status": "ok", nuevo_mensaje })
})

const PORT = 8000;
app.listen(PORT, () => console.log(`Servidor funcionando en :${PORT}`))
