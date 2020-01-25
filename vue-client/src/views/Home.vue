<template>
  <div class="home">
    <v-container claas="grey lighten-5">
      <v-row>
        {{user}}
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" align="center">
          <h2>Lista de clientes</h2>
        </v-col>
      </v-row>
      <TableContainer :list="getClientes"/>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable */ 
import TableContainer from "@/components/Table.component.vue";
import { CLIENTES_QUERY } from "@/graphql/queries";

export default {
  name: "home",
  props: ["user"],
    data: () => ({}),
  components: {
    TableContainer
  },
  apollo: {
    getClientes: {
      query: CLIENTES_QUERY
    }
  }
};
</script>
