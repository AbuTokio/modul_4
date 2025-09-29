import express from "express"

// Diese app-Variable ist wie ein virtueller Server (local).

const app = express()
const PORT = 3000

const users_DatenBank = [
  {
    id: 1,
    name: "John",
    city: "Hamburg",
    age: 20,
  },
  {
    id: 2,
    name: "Hannah",
    city: "Berlin",
    age: 20,
  },
  {
    id: 3,
    name: "Joe",
    city: "Berlin",
    age: 30,
  },
]

const cities = [
  {
    id: 1,
    name: "Hamburg",
  },

  {
    id: 2,
    name: "Berlin",
  },
  {
    id: 3,
    name: "Wien",
  },
]

// app.get ist eine Methode, die auf GET-Anfragen reagiert und hat zwei Parameter:
// 1. Der Pfad ("/users")
// 2. Eine Callback-Funktion, die ausgeführt wird, wenn eine Anfrage an diesen Pfad gesendet wird.

app.get("/users", (req, res) => {
  // Der Browser kann nur mit JSON-Daten arbeiten.
  // Deswegen müssen wir die Daten in JSON umwandeln.
  res.json(users_DatenBank)
})

app.get("/cities", (req, res) => {
  res.json(cities)
})

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`)
})
