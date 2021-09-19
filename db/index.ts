interface Dinosaur {
  id: string
  name: string
  image: string
}

const db = new Map<string, Dinosaur>()

export default db
