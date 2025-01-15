<template>
  <v-dialog v-if="task" v-model="dialogStates[task.id]" width="auto">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-if="type === 'edit' && !task.completed"
        icon="mdi-pencil-outline"
        color="tertiary"
        density="comfortable"
        variant="text"
        :disabled="true"
        v-bind="activatorProps"
      />
      <v-btn
        v-if="type === 'delete'"
        icon="mdi-trash-can-outline"
        color="error"
        density="comfortable"
        variant="text"
        v-bind="activatorProps"
      />
    </template>
    <TaskForm
      :task="task"
      :toggleForm="() => task && toggleDialog(task.id)"
      :content="formContent"
    />
  </v-dialog>
  <v-dialog v-else-if="type === 'new'" v-model="dialogStates[0]" width="auto">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        prepend-icon="mdi-plus"
        variant="outlined"
        v-bind="activatorProps"
        :disabled="true"
      >
        new task
      </v-btn>
    </template>
    <TaskForm :toggleForm="() => toggleDialog(0)" :content="formContent" />
  </v-dialog>
</template>

<script lang="ts" setup>
import type { Task } from '../types'
import TaskForm from './TaskForm.vue'

const props = defineProps<{
  task?: Task
  type: string
}>()

const formContent = {
  action: props.type,
  title: props.type == 'edit' ? 'Edit Task' : 'New Task',
  icon: props.type == 'edit' ? 'mdi-pencil-outline' : 'mdi-plus-outline'
}

const dialogStates = reactive<{ [key: string]: boolean }>({})

const toggleDialog = (id: number) => {
  dialogStates[id] = !dialogStates[id]
}
</script>

<style></style>
