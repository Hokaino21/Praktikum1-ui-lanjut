import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/App.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/view/Home.vue'),
        meta: { breadcrumb: 'Home' },
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/view/About.vue'),
        meta: { breadcrumb: 'About' },
      },
      {
        path: 'browse',
        name: 'browse',
        component: () => import('@/view/Browse.vue'),
        meta: { breadcrumb: 'Browse' },
        redirect: '/browse/events',
        children: [
          {
            path: 'events',
            name: 'events',
            component: () => import('@/view/EventList.vue'),
            meta: { breadcrumb: 'Event List' },
          },
          {
            path: 'events/:id',
            name: 'event-detail',
            component: () => import('@/view/EventDetail.vue'),
            meta: { breadcrumb: 'Event Detail' },
          },
          {
            path: 'events/:id/register',
            name: 'event-registration',
            component: () => import('@/view/EventRegistration.vue'),
            meta: { breadcrumb: 'Registration' },
          },
          {
            path: 'category',
            name: 'category',
            component: () => import('@/view/Category.vue'),
            meta: { breadcrumb: 'Category' },
          },
          {
            path: 'your-events',
            name: 'your-events',
            component: () => import('@/view/YourEvents.vue'),
            meta: { breadcrumb: 'Your Events' },
          },
          {
            path: 'your-events/:id',
            name: 'ticket-receipt',
            component: () => import('@/view/TicketReceipt.vue'),
            meta: { breadcrumb: 'Ticket Receipt' },
          },
        ],
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('@/view/Contact.vue'),
        meta: { breadcrumb: 'Contact' },
      },
    ],
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/view/Dashboard.vue'),
        meta: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'events',
        name: 'event-management',
        component: () => import('@/view/EventManagement.vue'),
        meta: { breadcrumb: 'Event Management' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
