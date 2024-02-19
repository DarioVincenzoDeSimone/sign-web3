import { SafeUrl } from "@angular/platform-browser"

export interface IPigRecord {
    company: string,
    id: number,
    razza: string,
    weight: string
}

export interface IAnimal {
    code: string,
    breed: string,
    transactionHash: string
    urlQRTx?: SafeUrl //will be valued in table component
}

