import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/login.vue";
import dirDashboard from '../views/dirDashboard.vue';
import Users from '../views/users.vue';
import sidebarLayout from "../layout/sidebarLayout.vue";
import roleDashboard from '../views/roleDashboard.vue';
import totalSales from '@/views/totalSales.vue';
import stockSummary from '@/views/stockSummary.vue';
import reports from '@/views/reports.vue';
import stockOverview from '@/views/stockOverview.vue';
import procurement from '@/views/procurement.vue';
import sales from '@/views/sales.vue';
import creditSales from '@/views/creditSales.vue';
import salesHistory from '@/views/salesHistory.vue';
import creditHistory from '@/views/creditHistory.vue';
import { useUserStore } from '@/stores/userStore';







const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/login",
			name: "login",
			component: Login
		},
		{
			path: "/dashboard",
			name: "dashboard",
			component: sidebarLayout,
			children: [
				{
					path: "director",
					name: "director",
					component: dirDashboard,
				},
				{
					path: "roleDashboard",
					name: "roleDashboard",
					component: roleDashboard
				},
				{
					path: "total-sales",
					name: "total-sales",
					component: totalSales
				},
				{
					path: "stock-summary",
					name: "stock-summary",
					component: stockSummary
				},
				{
					path: "report",
					name: "report",
					component: reports
				},
				{
					path: "stock-branch",
					name: "stock-branch",
					component: stockOverview
				},
				{
					path: "produce",
					name: "produce",
					component: procurement
				},
				{
					path: "sales",
					name: "sales",
					component: sales
				},
				{
					path: "credit-sales",
					name: "credit-sales",
					component: creditSales
				},
				{
					path: "sales-branch",
					name: "sales-branch",
					component: salesHistory
				},
				{
					path: "credit-branch",
					name: "credit-branch",
					component: creditHistory
				},
				{
					path: "user",
					name: "user",
					component: Users,
				}
			]
		},
	],
})

router.beforeEach((to, from) => {
    // 1. Cleanup Modals (Keep this outside the return)
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
    document.body.classList.remove('modal-open');

    const userStore = useUserStore();
    const user = userStore.user;


    // 2. Public Access
    if (to.path === '/login') return true; // Instead of next()

	// 2. CRITICAL: If no token, they CANNOT enter any other page
    if (!user || !user.token) {
        return '/login'; 
    }

    // 3. Auth Check
    if (!user || !user.role) return '/login'; // Instead of next('/login')

    const bank = [
        { role: "director", routes: ["/dashboard/director","/dashboard/total-sales","/dashboard/stock-summary", "/dashboard/report", "/dashboard/user"] },
        { role: "manager", routes: ["/dashboard/roleDashboard","/dashboard/stock-branch", "/dashboard/produce", "/dashboard/sales", "/dashboard/credit-sales", "/dashboard/sales-branch", "/dashboard/credit-branch", "/dashboard/user"] },
        { role: "sales agent", routes: ["/dashboard/roleDashboard","/dashboard/stock-branch", "/dashboard/sales", "/dashboard/credit-sales", "/dashboard/sales-branch", "/dashboard/credit-branch"] }
    ];

    const userRole = user.role.toLowerCase();
    const roleConfig = bank.find(i => i.role === userRole);

    // 5. Permission Check
    if (roleConfig && roleConfig.routes.includes(to.path)) {
        return true; // Authorized
    } else {
        console.warn(`Denied: ${userRole} tried to access ${to.path}`);
        return '/login'; // Unauthorized
    }
});


// router.beforeEach((to, from) => {
//     const userStore = useUserStore();
    
//     // If they aren't on /login and have no token, kick them out
//     if (to.path !== '/login' && !userStore.user.token) {
//         return '/login';
//     }
    
//     return true;
// });


export default router
