import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import jobs from './jobs'
/**
* @see \App\Http\Controllers\Driver\DashboardController::dashboard
 * @see app/Http/Controllers/Driver/DashboardController.php:11
 * @route '/driver/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/driver/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Driver\DashboardController::dashboard
 * @see app/Http/Controllers/Driver/DashboardController.php:11
 * @route '/driver/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Driver\DashboardController::dashboard
 * @see app/Http/Controllers/Driver/DashboardController.php:11
 * @route '/driver/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Driver\DashboardController::dashboard
 * @see app/Http/Controllers/Driver/DashboardController.php:11
 * @route '/driver/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Driver\DashboardController::dashboard
 * @see app/Http/Controllers/Driver/DashboardController.php:11
 * @route '/driver/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Driver\DashboardController::dashboard
 * @see app/Http/Controllers/Driver/DashboardController.php:11
 * @route '/driver/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Driver\DashboardController::dashboard
 * @see app/Http/Controllers/Driver/DashboardController.php:11
 * @route '/driver/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
const driver = {
    jobs: Object.assign(jobs, jobs),
dashboard: Object.assign(dashboard, dashboard),
}

export default driver