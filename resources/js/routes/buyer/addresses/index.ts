import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Buyer\AddressController::index
 * @see app/Http/Controllers/Buyer/AddressController.php:12
 * @route '/buyer/addresses'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/buyer/addresses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Buyer\AddressController::index
 * @see app/Http/Controllers/Buyer/AddressController.php:12
 * @route '/buyer/addresses'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Buyer\AddressController::index
 * @see app/Http/Controllers/Buyer/AddressController.php:12
 * @route '/buyer/addresses'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Buyer\AddressController::index
 * @see app/Http/Controllers/Buyer/AddressController.php:12
 * @route '/buyer/addresses'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Buyer\AddressController::index
 * @see app/Http/Controllers/Buyer/AddressController.php:12
 * @route '/buyer/addresses'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Buyer\AddressController::index
 * @see app/Http/Controllers/Buyer/AddressController.php:12
 * @route '/buyer/addresses'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Buyer\AddressController::index
 * @see app/Http/Controllers/Buyer/AddressController.php:12
 * @route '/buyer/addresses'
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
* @see \App\Http\Controllers\Buyer\AddressController::store
 * @see app/Http/Controllers/Buyer/AddressController.php:19
 * @route '/buyer/addresses'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/buyer/addresses',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Buyer\AddressController::store
 * @see app/Http/Controllers/Buyer/AddressController.php:19
 * @route '/buyer/addresses'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Buyer\AddressController::store
 * @see app/Http/Controllers/Buyer/AddressController.php:19
 * @route '/buyer/addresses'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Buyer\AddressController::store
 * @see app/Http/Controllers/Buyer/AddressController.php:19
 * @route '/buyer/addresses'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Buyer\AddressController::store
 * @see app/Http/Controllers/Buyer/AddressController.php:19
 * @route '/buyer/addresses'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Buyer\AddressController::update
 * @see app/Http/Controllers/Buyer/AddressController.php:40
 * @route '/buyer/addresses/{address}'
 */
export const update = (args: { address: string | number | { id: string | number } } | [address: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/buyer/addresses/{address}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Buyer\AddressController::update
 * @see app/Http/Controllers/Buyer/AddressController.php:40
 * @route '/buyer/addresses/{address}'
 */
update.url = (args: { address: string | number | { id: string | number } } | [address: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { address: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { address: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    address: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        address: typeof args.address === 'object'
                ? args.address.id
                : args.address,
                }

    return update.definition.url
            .replace('{address}', parsedArgs.address.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Buyer\AddressController::update
 * @see app/Http/Controllers/Buyer/AddressController.php:40
 * @route '/buyer/addresses/{address}'
 */
update.put = (args: { address: string | number | { id: string | number } } | [address: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Buyer\AddressController::update
 * @see app/Http/Controllers/Buyer/AddressController.php:40
 * @route '/buyer/addresses/{address}'
 */
    const updateForm = (args: { address: string | number | { id: string | number } } | [address: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Buyer\AddressController::update
 * @see app/Http/Controllers/Buyer/AddressController.php:40
 * @route '/buyer/addresses/{address}'
 */
        updateForm.put = (args: { address: string | number | { id: string | number } } | [address: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Buyer\AddressController::destroy
 * @see app/Http/Controllers/Buyer/AddressController.php:63
 * @route '/buyer/addresses/{address}'
 */
export const destroy = (args: { address: string | number | { id: string | number } } | [address: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/buyer/addresses/{address}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Buyer\AddressController::destroy
 * @see app/Http/Controllers/Buyer/AddressController.php:63
 * @route '/buyer/addresses/{address}'
 */
destroy.url = (args: { address: string | number | { id: string | number } } | [address: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { address: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { address: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    address: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        address: typeof args.address === 'object'
                ? args.address.id
                : args.address,
                }

    return destroy.definition.url
            .replace('{address}', parsedArgs.address.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Buyer\AddressController::destroy
 * @see app/Http/Controllers/Buyer/AddressController.php:63
 * @route '/buyer/addresses/{address}'
 */
destroy.delete = (args: { address: string | number | { id: string | number } } | [address: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Buyer\AddressController::destroy
 * @see app/Http/Controllers/Buyer/AddressController.php:63
 * @route '/buyer/addresses/{address}'
 */
    const destroyForm = (args: { address: string | number | { id: string | number } } | [address: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Buyer\AddressController::destroy
 * @see app/Http/Controllers/Buyer/AddressController.php:63
 * @route '/buyer/addresses/{address}'
 */
        destroyForm.delete = (args: { address: string | number | { id: string | number } } | [address: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const addresses = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default addresses