<template>
  <Header />
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import { fetchCovidData } from "@/api";
import Header from "@/components/Header.vue";
export default {
  components: {
    Header,
  },
  methods: {
    async getCovid() {
      try {
        const data = await fetchCovidData();
        console.log(data);
      } catch (error) {
        console.error("Ошибка", error);
      }
    },
  },
  mounted() {
    this.getCovid();
  },
};
</script>
