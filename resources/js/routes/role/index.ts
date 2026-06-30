import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import selectionBf8a13 from './selection'
/**
 * @see routes/web.php:77
 * @route '/role-selection'
 */
export const selection = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: selection.url(options),
    method: 'get',
})

selection.definition = {
    methods: ["get","head"],
    url: '/role-selection',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:77
 * @route '/role-selection'
 */
selection.url = (options?: RouteQueryOptions) => {
    return selection.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:77
 * @route '/role-selection'
 */
selection.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: selection.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:77
 * @route '/role-selection'
 */
selection.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: selection.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:77
 * @route '/role-selection'
 */
    const selectionForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: selection.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:77
 * @route '/role-selection'
 */
        selectionForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: selection.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:77
 * @route '/role-selection'
 */
        selectionForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: selection.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    selection.form = selectionForm
const role = {
    selection: Object.assign(selection, selectionBf8a13),
}

export default role