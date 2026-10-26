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
            path: 'category',
            name: 'category',
            component: () => import('@/view/Category.vue'),
            meta: { breadcrumb: 'Category' },
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
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/App.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: '', name: 'home', component: () => import('@/views/Home.vue') },
      { path: 'about', name: 'about', component: () => import('@/views/About.vue') },
      {
        path: 'browse',
        name: 'browse',
        component: () => import('@/views/Browse.vue'),
        redirect: '/browse/events',
        children: [
          { path: 'events', name: 'events', component: () => import('@/views/EventList.vue') },
          { path: 'events/:id', name: 'event-detail', component: () => import('@/views/EventDetail.vue') },
          // RUTE BARU: Form Pendaftaran
          { path: 'events/:id/register', name: 'event-registration', component: () => import('@/views/EventRegistration.vue') },
          { path: 'category', name: 'category', component: () => import('@/views/Category.vue') },
          // RUTE BARU: Dompet Tiket
          { path: 'your-events', name: 'your-events', component: () => import('@/views/YourEvents.vue') },
          // RUTE BARU: Detail Tanda Terima Tiket
          { path: 'your-events/:id', name: 'ticket-receipt', component: () => import('@/views/TicketReceipt.vue') }
        ]
      },
      { path: 'contact', name: 'contact', component: () => import('@/views/Contact.vue') },
      {
        path: '/dashboard',
        component: DashboardLayout,
        children: [
          { path: '', name: 'dashboard-overview', component: () => import('@/views/Dashboard.vue') },
          { path: 'events', name: 'dashboard-events', component: () => import('@/views/EventManagement.vue') }
        ]
      },
      { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Memastikan layar selalu scroll ke atas saat pindah halaman
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  }
})

export default router
