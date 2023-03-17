class Expense {
  id: number
  descricao: string
  valor: number
  tipo: string

  constructor(descricao: string, valor: number, tipo: string) {
    this.id = Math.random()
    this.descricao = descricao
    this.valor = valor
    this.tipo = tipo
  }
}

export default Expense
