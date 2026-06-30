import StoreController from './StoreController'
import ProductController from './ProductController'
import OrderController from './OrderController'
const Seller = {
    StoreController: Object.assign(StoreController, StoreController),
ProductController: Object.assign(ProductController, ProductController),
OrderController: Object.assign(OrderController, OrderController),
}

export default Seller