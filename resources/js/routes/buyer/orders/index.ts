import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Buyer\OrderController::index
 * @see app/Http/Controllers/Buyer/OrderController.php:12
 * @route '/buyer/orders'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/buyer/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Buyer\OrderController::index
 * @see app/Http/Controllers/Buyer/OrderController.php:12
 * @route '/buyer/orders'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Buyer\OrderController::index
 * @see app/Http/Controllers/Buyer/OrderController.php:12
 * @route '/buyer/orders'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Buyer\OrderController::index
 * @see app/Http/Controllers/Buyer/OrderController.php:12
 * @route '/buyer/orders'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Buyer\OrderController::index
 * @see app/Http/Controllers/Buyer/OrderController.php:12
 * @route '/buyer/orders'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Buyer\OrderController::index
 * @see app/Http/Controllers/Buyer/OrderController.php:12
 * @route '/buyer/orders'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Buyer\OrderController::index
 * @see app/Http/Controllers/Buyer/OrderController.php:12
 * @route '/buyer/orders'
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
const orders = {
    index: Object.assign(index, index),
}

export default orders