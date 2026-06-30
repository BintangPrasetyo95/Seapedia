import JobController from './JobController'
import DashboardController from './DashboardController'
const Driver = {
    JobController: Object.assign(JobController, JobController),
DashboardController: Object.assign(DashboardController, DashboardController),
}

export default Driver