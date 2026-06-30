import DashboardController from './DashboardController'
import Seller from './Seller'
import Buyer from './Buyer'
import Driver from './Driver'
import Admin from './Admin'
import ApplicationReviewController from './ApplicationReviewController'
import Settings from './Settings'
const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
Seller: Object.assign(Seller, Seller),
Buyer: Object.assign(Buyer, Buyer),
Driver: Object.assign(Driver, Driver),
Admin: Object.assign(Admin, Admin),
ApplicationReviewController: Object.assign(ApplicationReviewController, ApplicationReviewController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers