import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/login.vue";
import dirDashboard from '../views/dirDashboard.vue';
import Users from '../views/users.vue';
import sidebarLayout from "../layout/sidebarLayout.vue";

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
			name: "/dashboard",
			component: sidebarLayout,
			children: [
				{
					path: "/dashboard/director",
					name: "/director",
					component: dirDashboard,
				},
				{
					path: "/dashboard/user",
					name: "/user",
					component: Users,
				}
			]
		},
	],
})

export default router
