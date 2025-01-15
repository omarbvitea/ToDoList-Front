<template>
  <v-card class="min-w-[320px] px-6 py-6 md:w-[400px]">
    <div v-if="content.action === 'delete'" class="flex flex-col gap-8">
      <h6 class="text-h6">Are you sure you want to delete this task?</h6>
      <div class="flex justify-end gap-4">
        <v-btn
          text="Cancel"
          variant="tonal"
          color="tertiary"
          @click="toggleForm"
        />
        <v-btn color="error" @click="deleteTask">
          <span v-if="!isLoading">Delete</span>
          <v-progress-circular indeterminate v-else />
        </v-btn>
      </div>
    </div>
    <v-form v-else @submit.prevent="onSubmit" v-model="form">
      <div class="text-h5 text-tertiary flex items-center gap-2">
        <v-icon :icon="content.icon" />
        <h5>{{ content.title }}</h5>
      </div>
      <div class="mt-4 flex flex-col gap-1">
        <div class="flex flex-col gap-2 md:flex-row">
          <v-text-field
            placeholder="Title"
            variant="underlined"
            :rules="[required]"
            v-model="title"
            clearable
          />
        </div>
        <v-text-field
          placeholder="Description"
          variant="underlined"
          v-model="description"
          clearable
        />
      </div>
      <div class="mt-2 flex w-full justify-end gap-4">
        <v-btn
          text="Cancel"
          variant="tonal"
          color="tertiary"
          @click="toggleForm"
          width="90"
        ></v-btn>
        <v-btn
          variant="elevated"
          type="submit"
          color="tertiary"
          width="90"
          :disabled="!form"
        >
          <span v-if="!isLoading">Save</span>
          <v-progress-circular indeterminate v-else />
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script lang="ts" setup>
import { useTask } from '../composables'
import type { Task } from '../types'

interface FormContent {
  action: string
  title?: string
  icon?: string
}

const props = defineProps<{
  task?: Task
  toggleForm: () => void
  content: FormContent
}>()

const form = ref(false)
const title = ref('')
const description = ref('')

const isLoading = ref(false)
const error = ref()

const required = (value: string) => !!value || 'Title is required'

const onSubmit = async () => {}

const deleteTask = async () => {
  isLoading.value = true
  try {
    if (props.task) {
      await useTask('DELETE', props.task)
    }
  } catch (e) {
    error.value = e
  } finally {
    isLoading.value = false
    props.toggleForm()
  }
}
</script>

<style></style>
