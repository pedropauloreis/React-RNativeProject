const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const formatCurrency = (moneyDecimal) => {
    return (moneyDecimal && moneyDecimal !== '0') ? `R$ ${parseFloat(moneyDecimal).toFixed(2).replace('.',',')}/dia` : 'GRATUITO';
}



module.exports = {
    validateEmail,formatCurrency
};

