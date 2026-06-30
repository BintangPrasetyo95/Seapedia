import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Buyer\CheckoutController::index
 * @see app/Http/Controllers/Buyer/CheckoutController.php:13
 * @route '/buyer/checkout'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/buyer/checkout',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Buyer\CheckoutController::index
 * @see app/Http/Controllers/Buyer/CheckoutController.php:13
 * @route '/buyer/checkout'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Buyer\CheckoutController::index
 * @see app/Http/Controllers/Buyer/CheckoutController.php:13
 * @route '/buyer/checkout'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Buyer\CheckoutController::index
 * @see app/Http/Controllers/Buyer/CheckoutController.php:13
 * @route '/buyer/checkout'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Buyer\CheckoutController::index
 * @see app/Http/Controllers/Buyer/CheckoutController.php:13
 * @route '/buyer/checkout'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Buyer\CheckoutController::index
 * @see app/Http/Controllers/Buyer/CheckoutController.php:13
 * @route '/buyer/checkout'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Buyer\CheckoutController::index
 * @see app/Http/Controllers/Buyer/CheckoutController.php:13
 * @route '/buyer/checkout'
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
* @see \App\Http\Controllers\Buyer\CheckoutController::store
 * @see app/Http/Controllers/Buyer/CheckoutController.php:31
 * @route '/buyer/checkout'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/buyer/checkout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Buyer\CheckoutController::store
 * @see app/Http/Controllers/Buyer/CheckoutController.php:31
 * @route '/buyer/checkout'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Buyer\CheckoutController::store
 * @see app/Http/Controllers/Buyer/CheckoutController.php:31
 * @route '/buyer/checkout'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Buyer\CheckoutController::store
 * @see app/Http/Controllers/Buyer/CheckoutController.php:31
 * @route '/buyer/checkout'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Buyer\CheckoutController::store
 * @see app/Http/Controllers/Buyer/CheckoutController.php:31
 * @route '/buyer/checkout'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Buyer\CheckoutController::discount
 * @see app/Http/Controllers/Buyer/CheckoutController.php:148
 * @route '/buyer/checkout/discount'
 */
export const discount = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: discount.url(options),
    method: 'post',
})

discount.definition = {
    methods: ["post"],
    url: '/buyer/checkout/discount',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Buyer\CheckoutController::discount
 * @see app/Http/Controllers/Buyer/CheckoutController.php:148
 * @route '/buyer/checkout/discount'
 */
discount.url = (options?: RouteQueryOptions) => {
    return discount.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Buyer\CheckoutController::discount
 * @see app/Http/Controllers/Buyer/CheckoutController.php:148
 * @route '/buyer/checkout/discount'
 */
discount.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: discount.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Buyer\CheckoutController::discount
 * @see app/Http/Controllers/Buyer/CheckoutController.php:148
 * @route '/buyer/checkout/discount'
 */
    const discountForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: discount.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Buyer\CheckoutController::discount
 * @see app/Http/Controllers/Buyer/CheckoutController.php:148
 * @route '/buyer/checkout/discount'
 */
        discountForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: discount.url(options),
            method: 'post',
        })
    
    discount.form = discountForm
const checkout = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
discount: Object.assign(discount, discount),
}

export default checkout