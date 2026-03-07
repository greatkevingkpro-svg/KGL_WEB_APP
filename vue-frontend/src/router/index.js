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

export default router
