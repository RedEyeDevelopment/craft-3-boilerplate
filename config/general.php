<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

return [
    // Aliases
    'aliases' => [
        '@cloudfrontUrl' => getenv('CLOUDFRONT_URL'),
        '@web' => getenv('SITE_URL')
    ],
    // Global settings
    '*' => [
        'defaultWeekStartDay' => 1,
        'omitScriptNameInUrls' => true,
        'cpTrigger' => (bool)getenv('CP_TRIGGER'),
        'preventUserEnumeration' => (bool)getenv('PREVENT_USER_ENUMERATION'),
        'allowUpdates' => (bool)getenv('ALLOW_UPDATES'),
        'allowAdminChanges' => (bool)getenv('ALLOW_ADMIN_CHANGES'),
        'backupOnUpdate' => (bool)getenv('BACKUP_ON_UPDATE'),
        'devMode' => (bool)getenv('DEV_MODE'),
        'enableTemplateCaching' => (bool)getenv('ENABLE_TEMPLATE_CACHING'),
        'isSystemLive' => (bool)getenv('IS_SYSTEM_LIVE'),
        'runQueueAutomatically' => (bool)getenv('RUN_QUEUE_AUTOMATICALLY'),
        'securityKey' => getenv('SECURITY_KEY'),
        'siteUrl' => getenv('SITE_URL'),
        // Craft config settings from constants
        'cacheDuration' => false,
        'defaultSearchTermOptions' => [
            'subLeft' => true,
            'subRight' => true,
        ],
        'defaultTokenDuration' => 'P2W',
        'enableCsrfProtection' => true,
        'errorTemplatePrefix' => 'errors/',
        'generateTransformsBeforePageLoad' => true,
        'maxCachedCloudImageSize' => 3000,
        'maxUploadFileSize' => '100M',
        'omitScriptNameInUrls' => true,
        'useEmailAsUsername' => true,
        'usePathInfo' => true,
        'useProjectConfigFile' => true,
    ],

    // Dev environment settings
    'dev' => [
        'devMode' => true,
    ],

    // Staging environment settings
    'staging' => [
        'allowAdminChanges' => true,
    ],

    // Production environment settings
    'production' => [
        'allowAdminChanges' => true,
    ],
];
