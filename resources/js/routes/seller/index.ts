import store from './store'
import products from './products'
import orders from './orders'
const seller = {
    store: Object.assign(store, store),
products: Object.assign(products, products),
orders: Object.assign(orders, orders),
}

export default seller