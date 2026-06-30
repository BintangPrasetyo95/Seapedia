<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Remap Laravel storage to /tmp for Vercel's read-only filesystem
$tmpStorage = '/tmp/storage';
$dirs = [
    $tmpStorage . '/framework/cache/data',
    $tmpStorage . '/framework/sessions',
    $tmpStorage . '/framework/views',
    $tmpStorage . '/logs',
    $tmpStorage . '/bootstrap/cache',
];

foreach ($dirs as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }
}

$_ENV['VIEW_COMPILED_PATH'] = $tmpStorage . '/framework/views';
$_SERVER['VIEW_COMPILED_PATH'] = $tmpStorage . '/framework/views';

$_ENV['APP_SERVICES_CACHE'] = $tmpStorage . '/bootstrap/cache/services.php';
$_SERVER['APP_SERVICES_CACHE'] = $tmpStorage . '/bootstrap/cache/services.php';
$_ENV['APP_PACKAGES_CACHE'] = $tmpStorage . '/bootstrap/cache/packages.php';
$_SERVER['APP_PACKAGES_CACHE'] = $tmpStorage . '/bootstrap/cache/packages.php';
$_ENV['APP_CONFIG_CACHE'] = $tmpStorage . '/bootstrap/cache/config.php';
$_SERVER['APP_CONFIG_CACHE'] = $tmpStorage . '/bootstrap/cache/config.php';
$_ENV['APP_ROUTES_CACHE'] = $tmpStorage . '/bootstrap/cache/routes.php';
$_SERVER['APP_ROUTES_CACHE'] = $tmpStorage . '/bootstrap/cache/routes.php';
$_ENV['APP_EVENTS_CACHE'] = $tmpStorage . '/bootstrap/cache/events.php';
$_SERVER['APP_EVENTS_CACHE'] = $tmpStorage . '/bootstrap/cache/events.php';

$_ENV['LOG_CHANNEL'] = 'stderr';
$_SERVER['LOG_CHANNEL'] = 'stderr';

if (isset($_ENV['POSTGRES_URL'])) {
    $_ENV['DB_CONNECTION'] = 'pgsql';
    $_SERVER['DB_CONNECTION'] = 'pgsql';
    $_ENV['DB_URL'] = $_ENV['POSTGRES_URL'];
    $_SERVER['DB_URL'] = $_ENV['POSTGRES_URL'];
}

// Force session to use cookies instead of ephemeral serverless filesystem
$_ENV['SESSION_DRIVER'] = 'cookie';
$_SERVER['SESSION_DRIVER'] = 'cookie';

$_ENV['APP_DEBUG'] = 'false';
$_SERVER['APP_DEBUG'] = 'false';

require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';
$app->useStoragePath($tmpStorage);
$app->handleRequest(Request::capture());

