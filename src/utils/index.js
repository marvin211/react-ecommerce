
/**
 * This function calculates total price of a new order 
 * @param {Array} products - cartProducts: Array of Objects
 * @returns {Number} - Total price of all products
 */
export const totalPrice = (products) => {

    let sum = 0;

    products.forEach( product => {
        sum += parseFloat(product.price);
    });

    return sum; 
}