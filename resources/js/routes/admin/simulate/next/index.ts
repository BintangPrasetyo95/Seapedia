import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\DashboardController::day
 * @see app/Http/Controllers/Admin/DashboardController.php:30
 * @route '/admin/simulate-next-day'
 */
export const day = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: day.url(options),
    method: 'post',
})

day.definition = {
    methods: ["post"],
    url: '/admin/simulate-next-day',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::day
 * @see app/Http/Controllers/Admin/DashboardController.php:30
 * @route '/admin/simulate-next-day'
 */
day.url = (options?: RouteQueryOptions) => {
    return day.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::day
 * @see app/Http/Controllers/Admin/DashboardController.php:30
 * @route '/admin/simulate-next-day'
 */
day.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: day.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::day
 * @see app/Http/Controllers/Admin/DashboardController.php:30
 * @route '/admin/simulate-next-day'
 */
    const dayForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: day.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::day
 * @see app/Http/Controllers/Admin/DashboardController.php:30
 * @route '/admin/simulate-next-day'
 */
        dayForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: day.url(options),
            method: 'post',
        })
    
    day.form = dayForm
const next = {
    day: Object.assign(day, day),
}

export default next