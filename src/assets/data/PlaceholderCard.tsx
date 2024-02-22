import { FormData } from "./Types"
export const PlaceholderCard: FormData = {
    id: 0,
    vendor: 'No Vendor',
    cardnumber: '0000000000000000',
    cardholder: 'FIRSTNAME LASTNAME',
    validThru: {        
        expiremonth: 'MM',
        expireyear: 'YY', 
        },
    CCV: '000'
}