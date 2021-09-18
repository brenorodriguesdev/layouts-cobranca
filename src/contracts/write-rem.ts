import { Cobranca } from "./cobranca";

export interface WriteRem {
    write(file: string, cobranca: Cobranca): void
}