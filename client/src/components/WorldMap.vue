<script lang="ts" setup>
import { useMachinesStore } from '../store/machines'

const machinesStore = useMachinesStore()
</script>

<template>
  <div class="world-map">
    <img src="/map.png" class="map-image" />

    <div
      v-for="machine in machinesStore.$state.machines"
      :key="machine.id"
      :style="{ top: `${machine.location?.lat}%`, left: `${machine.location?.lon}%` }"
      class="machine"
    >
      {{ machine.id }}
      <img src="/robot.png" class="robot-icon" />
    </div>
  </div>
</template>

<style scoped>
.world-map {
  position: relative;
  width: 100%;
  height: 100%;
}

.map-image {
  width: 100%;
  height: 100%;
}

.robot-icon {
  background-color: red;
  width: 50px;
  height: 50px;
}

.machine {
  position: absolute;
  display: flex;
  flex-direction: column;
}
</style>