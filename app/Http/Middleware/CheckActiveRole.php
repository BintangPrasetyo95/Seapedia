<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckActiveRole
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $activeRole = session('active_role');

        if (!$activeRole || $activeRole !== $role) {
            abort(403, 'Unauthorized role.');
        }

        return $next($request);
    }
}
