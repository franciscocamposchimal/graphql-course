<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field 
                label="Login" 
                name="login" 
                prepend-icon="person" 
                type="text"
                v-model="user.username" 
                />

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="lock"
                type="password"
                v-model="user.password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { LOGIN } from "@/graphql/mutations";

export default {
  name: "login",
  data: () => ({
    user: {
      username: "",
      password: ""
    }
  }),
  methods: {
    login(){
        this.$apollo.mutate({
          mutation: LOGIN,
          variables: {
            username: this.user.username,
            password: this.user.password
          }
        }).then(response => {
          console.log(response.data.auth);
          localStorage.setItem("token", response.data.auth.token);
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
};
</script>