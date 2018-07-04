

// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'fish.User'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'fish.UserRole'
grails.plugin.springsecurity.authority.className = 'fish.Role'
grails.plugin.springsecurity.controllerAnnotations.staticRules = [
	[pattern: '/',               access: ['permitAll']],
	[pattern: '/error',          access: ['permitAll']],
	[pattern: '/index',          access: ['permitAll']],
	[pattern: '/index.gsp',      access: ['permitAll']],
	[pattern: '/shutdown',       access: ['permitAll']],
	[pattern: '/assets/**',      access: ['permitAll']],
	[pattern: '/**/js/**',       access: ['permitAll']],
	[pattern: '/**/css/**',      access: ['permitAll']],
	[pattern: '/**/images/**',   access: ['permitAll']],
	[pattern: '/**/favicon.ico', access: ['permitAll']],
<<<<<<< HEAD
    [pattern: '/dbconsole/**',   access: ['ROLE_ADMIN']], // for access to H2 console
	[pattern: '/logout/**',      access: ['permitAll']],  // for easy access to logout
//	[pattern: '/catch/**',       access: ['ROLE_USER']],  // for catch controller
//  [pattern: '/fisher/**',       access: ['permitAll']],  // for fisher controller
//	[pattern: '/sw.js',          access: ['permitAll']],  // for service worker
	[pattern: '/User/getLogin',  access: ['permitAll']],  // to check user login info
	[pattern: '/user/**',             access: ['ROLE_ADMIN']],
	[pattern: '/role/**',             access: ['ROLE_ADMIN']],
	[pattern: '/registrationCode/**', access: ['ROLE_ADMIN']],
	[pattern: '/securityInfo/**',     access: ['ROLE_ADMIN']]
=======

    [pattern: '/logout/**',      access: ['permitAll']],  // for easy access to logout
    [pattern: '/catch/**',       access: ['ROLE_USER']],  // for catch controller
    [pattern: '/sw.js',          access: ['permitAll']],  // for service worker
    [pattern: '/User/getLogin',  access: ['permitAll']],  // to check user login info
    [pattern: '/dbconsole/**',   access: ['ROLE_ADMIN']], // for access to H2 console
>>>>>>> attempt_2
]


grails.plugin.springsecurity.rest.login.active  = true
grails.plugin.springsecurity.rest.login.endpointUrl = '/api/login'
grails.plugin.springsecurity.rest.login.failureStatusCode = '401'

grails.plugin.springsecurity.rest.login.useJsonCredentials  = true
grails.plugin.springsecurity.rest.login.usernamePropertyName =  'username'
grails.plugin.springsecurity.rest.login.passwordPropertyName =  'password'

grails.plugin.springsecurity.rest.logout.endpointUrl = '/api/logout'

grails.plugin.springsecurity.rest.token.generation.useSecureRandom  = true
grails.plugin.springsecurity.rest.token.generation.useUUID  = false

grails.plugin.springsecurity.rest.token.storage.useGorm = false
grails.plugin.springsecurity.rest.token.storage.gorm.tokenDomainClassName   = null
grails.plugin.springsecurity.rest.token.storage.gorm.tokenValuePropertyName = 'tokenValue'
grails.plugin.springsecurity.rest.token.storage.gorm.usernamePropertyName   = 'username'

grails.plugin.springsecurity.rest.token.rendering.usernamePropertyName  = 'username'
grails.plugin.springsecurity.rest.token.rendering.authoritiesPropertyName   = 'roles'

grails.plugin.springsecurity.rest.token.validation.active   = true
grails.plugin.springsecurity.rest.token.validation.headerName   = 'X-Auth-Token'
grails.plugin.springsecurity.rest.token.validation.endpointUrl  = '/api/validate'


grails.plugin.springsecurity.filterChain.chainMap = [
	[pattern: '/assets/**',      filters: 'none'],
	[pattern: '/**/js/**',       filters: 'none'],
	[pattern: '/**/css/**',      filters: 'none'],
	[pattern: '/**/images/**',   filters: 'none'],
	[pattern: '/**/favicon.ico', filters: 'none'],
    // stateless chain
    [pattern: '/api/**', filters: 'JOINED_FILTERS,-securityContextPersistenceFilter,-authenticationProcessingFilter,-rememberMeAuthenticationFilter,-anonymousAuthenticationFilter,-exceptionTranslationFilter'],
    // traditional chain
    [pattern: '/**', filters: 'JOINED_FILTERS,-restTokenValidationFilter,-restExceptionTranslationFilter']
]

grails.plugin.springsecurity.logout.postOnly = false
