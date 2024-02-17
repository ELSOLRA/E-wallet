

const Card = () => {

    const myCard = {
        firstName: 'Egil',
        lastName: 'Ramsten',
        number: 1234567812345678,
        valid: '05/32',
        vendor: 'Ninja Bank',
        id: 1,
        CCV: 123
    }

    const vendors = [
        { name: 'Ninja Bank' , icon:'./src/assets/icons/Ninjalogo.svg', color: 'rgba(34, 34, 34, 1)' },
        { name: 'Bitcoin INC', icon: './src/assets/icons/Bitcoinlogo.svg', color: 'rgba(255, 174, 52, 1)'},
        { name: 'Block Chain INC', icon: './src/assets/icons/chainlogo.svg', color: 'rgba(139, 88, 249, 1)' },
        { name: 'Evil Corp', icon: './src/assets/icons/Evillogo.svg', color: 'rgba(243, 51, 85, 1)'}
    ]

    function CardIcon() {
        let activeIcon = ''
        for ( let i = 0; i < vendors.length; i++) {
            if (vendors[i].name == myCard.vendor) {
                activeIcon = vendors[i].icon
            }
        }
        return (
           <>
           <img src={activeIcon} alt="" />
           </>
        )
    }

    return (
        <div className="card--wrapper">
            <div className="card--icons">
                <img src='/src/assets/icons/chip.svg' alt="chip icon" />
                <CardIcon />
            </div>
            <h1 className="card--number">{myCard.number}</h1>
            <div className="card--info">
                <div className='card--info__top'>
                    <p>CARDHOLDER NAME</p>
                    <p>{myCard.firstName} {myCard.lastName}</p>
                </div>
                <div className='card--info__bottom'>
                    <p>VALID THRU</p>
                    <p>{myCard.valid}</p>
                </div>
            </div>
        </div>
    )
}

export default Card