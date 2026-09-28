<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => {
  const matched = route.matched

  const crumbs = matched
    .map((m) => {
      let path = m.path

      if (path.includes(':')) {
        path = route.path
      }

      return {
        path: path,
        meta: m.meta,
      }
    })
    .filter((m) => m.meta && m.meta.breadcrumb)

  if (route.name === 'event-detail') {
    crumbs.splice(crumbs.length - 1, 0, {
      path: '/browse/events',
      meta: { breadcrumb: 'Event List' },
    })
  }

  if (
    crumbs.length === 0 ||
    crumbs[0].meta.breadcrumb !== 'Home'
  ) {
    crumbs.unshift({
      path: '/',
      meta: { breadcrumb: 'Home' },
    })
  }

  return crumbs
})
</script>

<template>
  <nav
    class="breadcrumb"
    v-if="breadcrumbs.length > 0"
  >
    <ul>
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
      >
        <span
          v-if="index > 0"
          class="separator"
        >
          /
        </span>

        <router-link
          v-if="index < breadcrumbs.length - 1"
          :to="crumb.path"
        >
          {{ crumb.meta.breadcrumb }}
        </router-link>

        <span
          v-else
          class="active-crumb"
        >
          {{ crumb.meta.breadcrumb }}
        </span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.breadcrumb {
  padding: 1rem 0;
}

.breadcrumb ul {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumb a {
  color: var(--primary, #6644ff);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.separator {
  color: #999;
}

.active-crumb {
  color: #666;
}
</style>