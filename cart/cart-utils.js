import { findByID } from '../utils.js';

export function calcLineItem(quantity, amount){
    return Number(quantity) * Number(amount);
}

export function renderLineItem(cartLineItem, product){
    const tr = document.createElement('tr');
    const productTD = document.createElement('td');
    const costTD = document.createElement('td');
    const quantityTD = document.createElement('td');
    const totalTD = document.createElement('td');
    productTD.textContent = product.name;
    costTD.textContent = `$${product.price}`;
    quantityTD.textContent = cartLineItem.quantity;
    totalTD.textContent = `$${calcLineItem(product.price, cartLineItem.quantity)}`;
    tr.append(productTD, costTD, quantityTD, totalTD);
    return tr;
}

export function calcOrderTotal(cartArray, productArray){
    let totalCost = 0;

    for (let i = 0; i < cartArray.length; i++){
        const cartItem = cartArray[i];
        const product = findByID(productArray, cartItem.id);
        if (product !== null){
            const lineCost = calcLineItem(cartItem.quantity, product.price);
            totalCost = totalCost + lineCost; 
        }
    }
    return totalCost;
}

export function toggleCartElements(state){

    const table = document.getElementsByTagName('table')[0]; 
    
    const messageSection = document.getElementsByTagName('section')[0]; 
    const button = document.getElementById('place-order');

    if (state === true){
        button.style.display = 'none';
        table.style.display = 'none';
        messageSection.style.display = 'inline';
    } else {
        button.style.display = 'block';
        table.style.display = 'table';
        messageSection.style.display = 'none';
    }
}