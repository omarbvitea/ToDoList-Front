<template>
  <v-container fluid>
    <div v-if="error">Something went wrong</div>
    <div v-if="isLoading">
      <v-skeleton-loader v-for="n in 4" height="70" type="list-item-avatar" />
      <v-skeleton-loader type="chip" />
    </div>
    <div
      v-for="task in data"
      :key="task.id"
      class="flex w-full flex-col items-center justify-between"
    >
      <div class="flex w-full items-center">
        <div class="relative flex w-full items-center">
          <v-checkbox
            density="comfortable"
            :hide-details="true"
            :model-value="status === 'completed'"
          />
          <div class="absolute left-10 top-2">
            <span class="line-clamp-1">{{ task.title }}</span>
            <span class="text-primary line-clamp-1 text-xs">
              {{ task.description }}
            </span>
          </div>
        </div>
        <TaskAction :task="task" type="edit" />
        <TaskAction :task="task" type="delete" />
      </div>
      <v-divider
        :thickness="0.5"
        :opacity="0.6"
        class="my-4 flex w-full"
        color="error"
      />
    </div>
    <TaskAction v-if="data" type="new" />
  </v-container>
</template>

<script lang="ts" setup>
import TaskAction from './TaskAction.vue'
import { useFetch } from '../composables'
import { getApi } from '../service'

const props = defineProps<{ status: string }>()
const apiUrl = getApi()

const { data, error, isLoading } = useFetch(`${apiUrl}/${props.status}`)
</script>

<style></style>
