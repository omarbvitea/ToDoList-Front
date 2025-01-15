<template>
  <main class="mx-auto flex h-full w-full max-w-2xl items-center md:py-20">
    <section class="h-full w-full">
      <div class="hidden md:flex">
        <v-tabs v-model="tab" fixed-tabs>
          <v-tab v-for="status in taskStates" :value="status">{{
            status
          }}</v-tab>
        </v-tabs>
      </div>
      <div class="flex md:hidden">
        <v-tabs v-model="tab" grow>
          <v-tab v-for="status in taskStates" :value="status">{{
            status
          }}</v-tab>
        </v-tabs>
      </div>
      <v-tabs-window v-model="tab" class="mt-4">
        <v-tabs-window-item v-for="status in taskStates" :value="status">
          <TasksList :status="status" />
        </v-tabs-window-item>
      </v-tabs-window>
    </section>
  </main>
</template>
<script lang="ts" setup>
import TasksList from '../features/tasks/components/TasksList.vue'

const tab = ref()
const taskStates = ['today', 'upcoming', 'completed']
</script>

<style scoped></style>
