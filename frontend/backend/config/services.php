<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

   'google' => [ // <-- ADD THIS NEW BLOCK
        'client_id' => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect' => env('GOOGLE_REDIRECT_URL'),
    ],
    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'gmail_smtp' => [
        'mail_mailer' => env('MAIL_MAILER', 'smtp'),
        'mail_host' => env('MAIL_HOST', 'smtp.gmail.com'),
        'mail_port' => env('MAIL_PORT', 587),
        'mail_username' => env('MAIL_USERNAME'),
        'mail_password' => env('MAIL_PASSWORD'),
        'mail_encryption' => env('MAIL_ENCRYPTION', 'tls'),
        'mail_from_address' => env('MAIL_FROM_ADDRESS'),
        'mail_from_name' => env('MAIL_FROM_NAME'),
    ],

];
