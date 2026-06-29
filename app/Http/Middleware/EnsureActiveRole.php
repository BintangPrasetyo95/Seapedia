<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class EnsureActiveRole
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return $next($request);
        }

        if (session()->has('active_role')) {
            return $next($request);
        }

        $user = Auth::user();
        $roles = $user->roles;

        if ($roles->isEmpty()) {
            return $next($request);
        }

        if ($roles->count() === 1) {
            session(['active_role' => $roles->first()->name]);
            return $next($request);
        }

        // If they have multiple roles, force them to select one
        if (!$request->routeIs('role.selection', 'role.selection.store', 'logout')) {
            return redirect()->route('role.selection');
        }

        return $next($request);
    }
}
