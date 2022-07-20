export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard/default',
        icon: 'grid (1) 1.png',
    },
    {
        name: 'Flows',
        path: '/dashboard/flows',
        icon: 'flow.png',
    },
    {
        name: 'Robot',
        path: '/dashboard/robot',
        icon: 'bx_bot.png',
    },
    {
        name: 'Triggers',
        path: '/dashboard/triggers',
        icon: 'Group.png',
    },
    // {
    //     name: 'Schedules',
    //     path: '/dashboard/schedules',
    //     icon: 'schedule.png',
    // },
    // {
    //     name: 'Queues',
    //     path: '/dashboard/queues',
    //     icon: 'queues.png',
    // },
    {
        name: 'Users',
        path: '/dashboard/users',
        icon: 'users.png',
    },
    // {
    //     name: 'Jobs',
    //     path: '/dashboard/jobs',
    //     icon: 'job.png',
    // },
    // {
    //     name: 'Lincenses',
    //     path: '/dashboard/lincenses',
    //     icon: 'users.png',
    // },
    // {
    //     name: 'Audit',
    //     path: '/dashboard/audit',
    //     icon: 'audit.png',
    // },
    // {
    //     name: 'Repositories',
    //     path: '/dashboard/repositories',
    //     icon: 'repositories.png',
    // },
    {
        name: 'Billing',
        path: '/dashboard/billing',
        icon: 'billing.png',
    },
    // {
    //     name: 'API',
    //     path: '/dashboard/api',
    //     icon: 'api.png',
    // },
    // {
    //     label: 'PAGES',
    //     type: 'label',
    // },
    {
        name: 'Session/Auth',
        icon: 'security',
        children: [
            {
                name: 'Sign in',
                iconText: 'SI',
                path: '/session/signin',
            },
            {
                name: 'Sign up',
                iconText: 'SU',
                path: '/session/signup',
            },
            {
                name: 'Forgot Password',
                iconText: 'FP',
                path: '/session/forgot-password',
            },
            {
                name: 'Error',
                iconText: '404',
                path: '/session/404',
            },
        ],
    },
    
]
