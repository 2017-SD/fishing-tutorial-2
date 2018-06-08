

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
	[pattern: '/logout/**',      access: ['permitAll']],  // for easy access to logout
	[pattern: '/catch/**',       access: ['permitAll']],  // for catch controller
	[pattern: '/sw.js',          access: ['permitAll']],  // for service worker
	[pattern: '/User/getLogin',  access: ['permitAll']],  // to check user login info
	[pattern: '/dbconsole/**',   access: ['ROLE_ADMIN']], // for access to H2 console
	[pattern: '/user/**',             access: ['ROLE_ADMIN']],
	[pattern: '/role/**',             access: ['ROLE_ADMIN']],
	[pattern: '/registrationCode/**', access: ['ROLE_ADMIN']],
	[pattern: '/securityInfo/**',     access: ['ROLE_ADMIN']],
	[pattern: '/logout/**',           access: ['permitAll']],
]

grails.plugin.springsecurity.filterChain.chainMap = [
	[pattern: '/assets/**',      filters: 'none'],
	[pattern: '/**/js/**',       filters: 'none'],
	[pattern: '/**/css/**',      filters: 'none'],
	[pattern: '/**/images/**',   filters: 'none'],
	[pattern: '/**/favicon.ico', filters: 'none'],
	[pattern: '/**',             filters: 'JOINED_FILTERS']
]

grails.plugin.springsecurity.logout.postOnly = false
