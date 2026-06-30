import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Driver\JobController::index
 * @see app/Http/Controllers/Driver/JobController.php:11
 * @route '/driver/jobs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/driver/jobs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Driver\JobController::index
 * @see app/Http/Controllers/Driver/JobController.php:11
 * @route '/driver/jobs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Driver\JobController::index
 * @see app/Http/Controllers/Driver/JobController.php:11
 * @route '/driver/jobs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Driver\JobController::index
 * @see app/Http/Controllers/Driver/JobController.php:11
 * @route '/driver/jobs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Driver\JobController::index
 * @see app/Http/Controllers/Driver/JobController.php:11
 * @route '/driver/jobs'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Driver\JobController::index
 * @see app/Http/Controllers/Driver/JobController.php:11
 * @route '/driver/jobs'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Driver\JobController::index
 * @see app/Http/Controllers/Driver/JobController.php:11
 * @route '/driver/jobs'
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
* @see \App\Http\Controllers\Driver\JobController::take
 * @see app/Http/Controllers/Driver/JobController.php:32
 * @route '/driver/jobs/{order}/take'
 */
export const take = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: take.url(args, options),
    method: 'post',
})

take.definition = {
    methods: ["post"],
    url: '/driver/jobs/{order}/take',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Driver\JobController::take
 * @see app/Http/Controllers/Driver/JobController.php:32
 * @route '/driver/jobs/{order}/take'
 */
take.url = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { order: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        order: typeof args.order === 'object'
                ? args.order.id
                : args.order,
                }

    return take.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Driver\JobController::take
 * @see app/Http/Controllers/Driver/JobController.php:32
 * @route '/driver/jobs/{order}/take'
 */
take.post = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: take.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Driver\JobController::take
 * @see app/Http/Controllers/Driver/JobController.php:32
 * @route '/driver/jobs/{order}/take'
 */
    const takeForm = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: take.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Driver\JobController::take
 * @see app/Http/Controllers/Driver/JobController.php:32
 * @route '/driver/jobs/{order}/take'
 */
        takeForm.post = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: take.url(args, options),
            method: 'post',
        })
    
    take.form = takeForm
/**
* @see \App\Http\Controllers\Driver\JobController::complete
 * @see app/Http/Controllers/Driver/JobController.php:46
 * @route '/driver/jobs/{order}/complete'
 */
export const complete = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/driver/jobs/{order}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Driver\JobController::complete
 * @see app/Http/Controllers/Driver/JobController.php:46
 * @route '/driver/jobs/{order}/complete'
 */
complete.url = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { order: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        order: typeof args.order === 'object'
                ? args.order.id
                : args.order,
                }

    return complete.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Driver\JobController::complete
 * @see app/Http/Controllers/Driver/JobController.php:46
 * @route '/driver/jobs/{order}/complete'
 */
complete.post = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Driver\JobController::complete
 * @see app/Http/Controllers/Driver/JobController.php:46
 * @route '/driver/jobs/{order}/complete'
 */
    const completeForm = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: complete.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Driver\JobController::complete
 * @see app/Http/Controllers/Driver/JobController.php:46
 * @route '/driver/jobs/{order}/complete'
 */
        completeForm.post = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: complete.url(args, options),
            method: 'post',
        })
    
    complete.form = completeForm
const jobs = {
    index: Object.assign(index, index),
take: Object.assign(take, take),
complete: Object.assign(complete, complete),
}

export default jobs