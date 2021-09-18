import { Cobranca } from "./cobranca";

export interface ReadRem {
    read (file: string): Promise<Cobranca>
}