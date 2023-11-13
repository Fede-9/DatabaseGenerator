import definirModelo from "@/util/definirModelos";

export default async function handler(req, res) {
  let lista = []
  if (req.method === 'POST') {
    lista = req.body;
    const Modelo = definirModelo(req.body);
    res.status(200).json({ message: 'Modelo creado exitosamente'});
  } else {
    res.status(405).json({ message: "Error en el servidor"});
  }
}
