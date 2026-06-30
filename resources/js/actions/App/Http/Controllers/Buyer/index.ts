import ShopController from './ShopController'
import WalletController from './WalletController'
import AddressController from './AddressController'
import CartController from './CartController'
import CheckoutController from './CheckoutController'
import OrderController from './OrderController'
const Buyer = {
    ShopController: Object.assign(ShopController, ShopController),
WalletController: Object.assign(WalletController, WalletController),
AddressController: Object.assign(AddressController, AddressController),
CartController: Object.assign(CartController, CartController),
CheckoutController: Object.assign(CheckoutController, CheckoutController),
OrderController: Object.assign(OrderController, OrderController),
}

export default Buyer