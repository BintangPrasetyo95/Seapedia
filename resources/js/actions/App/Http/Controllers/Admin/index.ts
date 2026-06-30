import DashboardController from './DashboardController'
import VoucherController from './VoucherController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
VoucherController: Object.assign(VoucherController, VoucherController),
}

export default Admin