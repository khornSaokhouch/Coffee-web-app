<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    // Set your frontend origin explicitly, NO '*'
    'allowed_origins' => ['http://localhost:3000', 'https://coffee-web-app-gamma.vercel.app'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // IMPORTANT: must be true to allow credentials
    'supports_credentials' => true,

];
