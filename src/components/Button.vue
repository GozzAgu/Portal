<template>
    <div class="flex">
      <el-button class="details" @click="emit('button-clicked')" color="#408AE2" plain>
        <p>{{ props.buttonText }}</p>
      </el-button>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    buttonText: String,
});

const emit = defineEmits(['button-clicked']);
</script>

<style scoped>
button.details{
  background-color: rgb(132, 181, 255);
  border: none;
  color: aliceblue;
  font-weight: 700;
}

button.details:hover{
  background-color: rgb(177, 210, 253);
  border: none;
  color: rgb(32, 150, 253);

}
</style>