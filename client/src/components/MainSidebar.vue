<script lang="ts" setup>
import { useMachinesStore } from '../store/machines'

const machinesStore = useMachinesStore()
</script>

<template>
  <div class="main-sidebar">
    <h2>Machines:</h2>
    <ul
      v-for="machine in machinesStore.$state.machines"
      :key="machine.id"
    >
      <li>
        <h3>Machine #{{ machine.id }}</h3>
        <p>
          Fuel: {{ Math.round(machine.fuelLevel) }}% |
          <button @click="machinesStore.togglePause(machine)">&#9199;&#65039;</button> |
          <button @click="machinesStore.refuel(machine)">Refuel</button>
        </p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.main-sidebar {
  text-align: left;
  width: 380px;
  font-size: 90%;
}
</style>