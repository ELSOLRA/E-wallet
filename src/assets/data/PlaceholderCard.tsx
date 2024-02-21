import { FormData } from "./Types"

export const PlaceholderCard: FormData = {
    id: 0,
    vendor: 'No Vendor',
    cardnumber: '0000000000000000',
    cardholder: 'FIRSTNAME LASTNAME',
    validThru: {        
        expiremonth: '03',
        expireyear: '24', 
        },
    CCV: '000'
}