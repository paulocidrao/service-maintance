<script setup lang="ts">
const { profile, getProfile } = useProfile();

onMounted(async () => {
  await getProfile()
})

</script>

<template>
  <ULink to="/profile">
    <UAvatar :alt="profile?.name" size="2xl" />
  </ULink>
</template>
