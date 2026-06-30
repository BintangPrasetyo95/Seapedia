import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\DashboardController::index
 * @see app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/admin/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::index
 * @see app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/admin/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::index
 * @see app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/admin/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::index
 * @see app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/admin/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::index
 * @see app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/admin/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::index
 * @see app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/admin/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::index
 * @see app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/admin/dashboard'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::simulateNextDay
 * @see app/Http/Controllers/Admin/DashboardController.php:30
 * @route '/admin/simulate-next-day'
 */
export const simulateNextDay = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: simulateNextDay.url(options),
    method: 'post',
})

simulateNextDay.definition = {
    methods: ["post"],
    url: '/admin/simulate-next-day',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::simulateNextDay
 * @see app/Http/Controllers/Admin/DashboardController.php:30
 * @route '/admin/simulate-next-day'
 */
simulateNextDay.url = (options?: RouteQueryOptions) => {
    return simulateNextDay.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::simulateNextDay
 * @see app/Http/Controllers/Admin/DashboardController.php:30
 * @route '/admin/simulate-next-day'
 */
simulateNextDay.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: simulateNextDay.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::simulateNextDay
 * @see app/Http/Controllers/Admin/DashboardController.php:30
 * @route '/admin/simulate-next-day'
 */
    const simulateNextDayForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: simulateNextDay.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::simulateNextDay
 * @see app/Http/Controllers/Admin/DashboardController.php:30
 * @route '/admin/simulate-next-day'
 */
        simulateNextDayForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: simulateNextDay.url(options),
            method: 'post',
        })
    
    simulateNextDay.form = simulateNextDayForm
const DashboardController = { index, simulateNextDay }

export default DashboardController