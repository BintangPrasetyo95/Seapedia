import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \App\Http\Controllers\Driver\JobController::takeJob
 * @see app/Http/Controllers/Driver/JobController.php:32
 * @route '/driver/jobs/{order}/take'
 */
export const takeJob = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: takeJob.url(args, options),
    method: 'post',
})

takeJob.definition = {
    methods: ["post"],
    url: '/driver/jobs/{order}/take',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Driver\JobController::takeJob
 * @see app/Http/Controllers/Driver/JobController.php:32
 * @route '/driver/jobs/{order}/take'
 */
takeJob.url = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return takeJob.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Driver\JobController::takeJob
 * @see app/Http/Controllers/Driver/JobController.php:32
 * @route '/driver/jobs/{order}/take'
 */
takeJob.post = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: takeJob.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Driver\JobController::takeJob
 * @see app/Http/Controllers/Driver/JobController.php:32
 * @route '/driver/jobs/{order}/take'
 */
    const takeJobForm = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: takeJob.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Driver\JobController::takeJob
 * @see app/Http/Controllers/Driver/JobController.php:32
 * @route '/driver/jobs/{order}/take'
 */
        takeJobForm.post = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: takeJob.url(args, options),
            method: 'post',
        })
    
    takeJob.form = takeJobForm
/**
* @see \App\Http\Controllers\Driver\JobController::completeJob
 * @see app/Http/Controllers/Driver/JobController.php:46
 * @route '/driver/jobs/{order}/complete'
 */
export const completeJob = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: completeJob.url(args, options),
    method: 'post',
})

completeJob.definition = {
    methods: ["post"],
    url: '/driver/jobs/{order}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Driver\JobController::completeJob
 * @see app/Http/Controllers/Driver/JobController.php:46
 * @route '/driver/jobs/{order}/complete'
 */
completeJob.url = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return completeJob.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Driver\JobController::completeJob
 * @see app/Http/Controllers/Driver/JobController.php:46
 * @route '/driver/jobs/{order}/complete'
 */
completeJob.post = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: completeJob.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Driver\JobController::completeJob
 * @see app/Http/Controllers/Driver/JobController.php:46
 * @route '/driver/jobs/{order}/complete'
 */
    const completeJobForm = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: completeJob.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Driver\JobController::completeJob
 * @see app/Http/Controllers/Driver/JobController.php:46
 * @route '/driver/jobs/{order}/complete'
 */
        completeJobForm.post = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: completeJob.url(args, options),
            method: 'post',
        })
    
    completeJob.form = completeJobForm
const JobController = { index, takeJob, completeJob }

export default JobController