<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <div v-for="client in list" :key="client.id">
          {{ client.nombre }}
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    list: {
      type: [Object, Array]
    }
  },
  data: () => ({
  })
};
</script>
