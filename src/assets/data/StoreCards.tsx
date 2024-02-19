import vendors from './vendors'

const Cards = [
    {
        firstName: 'Egil',
        lastName: 'Ramsten',
        number: [ 1,  2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8 ],
        valid: '05/32',
        vendor: `${vendors[0].name}`,
        id: 1,
        CCV: 123
    },
    {
        firstName: 'David',
        lastName: 'Hasselhoff',
        number: [ 1,  1, 1, 1, 2, 2, 2, 2, 7, 8, 7, 8, 9, 9, 9, 9 ],
        valid: '11/26',
        vendor: `${vendors[2].name}`,
        id: 2,
        CCV: 562
    },
    {
        firstName: 'Carl',
        lastName: 'Bernadotte',
        number: [ 9, 9, 9, 9, 8, 8, 8, 8, 7, 7, 7, 7, 1, 2, 3, 4 ],
        valid: '01/28',
        vendor: `${vendors[3].name}`,
        id: 3,
        CCV: 987
    }

]
export default Cards