<script lang="ts">
import { mapActions, mapState } from 'pinia'

import Sidebar from './components/MainSidebar.vue'
import WorldMap from './components/WorldMap.vue'
import { useMachinesStore } from './store/machines'

export default {
  name: 'App',
  components: {
    Sidebar,
    WorldMap,
  },
  computed: {
    ...mapState(useMachinesStore, ['machines']),
  },
  methods: {
    ...mapActions(useMachinesStore, ['readMachinesStream']),
  },
  async mounted() {
    this.readMachinesStream()
  }
}

</script>

<template>
  <div class="app">
    <sidebar />
    <world-map />
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
  width: 100%;

  .sidebar {
    flex-shrink: 0;
    min-width: 400px;
    margin-right: 30px;
  }
}
</style>
