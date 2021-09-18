import { ReadFebrabanRem } from "./implementations/read-febraban-rem";

async function ler() {
    const readFebrabanRem = new ReadFebrabanRem()
    const cobranca = await readFebrabanRem.read('teste.RET')
    console.log(cobranca)
}

ler()