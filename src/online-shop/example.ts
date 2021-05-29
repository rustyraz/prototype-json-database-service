import { Entity, DataStore } from '../index';
import * as faker from 'faker';

interface Customer {
    name: string;
    email: string;
    password: string;
}

interface Product {
    name: string;
    description: string;
    price: number;
    instockQuantity: number;    
}

enum orderStatus {
    pending_checkout = "pending_checkout",
    awaiting_payment = "awaiting_payment",
    payment_received = "payment_received",
    completed = "completed",
    shipped = "shipped",
    cancelled = "cancelled" 
}

interface Order  {
    customerId: string;
    status: orderStatus
}

interface OrderItem {
    orderId: string;
    productId: string;
    quantity: number;
}

// Create a datastore
const store = new DataStore('./data');

const customers = store.collection('customers');
const products =  store.collection('products');
const orders = store.collection('orders');
const orderItems = store.collection('orderItems');

const newCustomer: Customer = {
    email: faker.internet.email(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    password: faker.internet.password()
};

const newProduct: Product = {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: +faker.commerce.price(),
    instockQuantity: +faker.datatype.number()
};


// console.log("************************NEW customers*****************")
const customerId = customers.create(newCustomer);
console.log(customerId) 

//console.log("************************NEW product*****************")
const productId = products.create(newProduct);
console.log(productId)

//console.log("************************NEW Order*****************")
const newOrder: Order = {
    customerId,
    status: orderStatus.pending_checkout
};
const orderId = orders.create(newOrder);

// console.log("************************NEW OrderItem*****************")
const newOrderItem: OrderItem = {
    orderId,
    productId,
    quantity: 1
};
const orderItemId = orderItems.create(newOrderItem);


console.log("************************Final Data*****************")
console.log("========customers=======")
console.log(customers.list());
console.log("========products=======")
console.log(products.list());
console.log("========orders=======")
console.log(orders.list());
console.log("========orderItems=======")
console.log(orderItems.list())