<template>
  <v-app>
    <v-toolbar app primary>
      <v-toolbar-title class="headline text-uppercase">
        <span>Keymetric dashboard</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/yoannKy/keymetrics-dashboard"
        target="_blank"
      >
        <span class="mr-2">Go to repository</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>
<script>

export default {
  name: 'App',
}
</script>
