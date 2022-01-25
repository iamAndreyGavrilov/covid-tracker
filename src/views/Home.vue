<template>
  <main v-if="!loading">
    <DataTitle :text="title" :dataDate="dataDate" />
    <DataBoxes :stats="stats" />
    <CountrySelect @get-country="getCountryData" :countries="countries" />
  </main>
  <main v-else class="flex flex-col justify-center content-center text-center">
    <h2 class="text-gray-500 text-3xl mt-10 mb-6">Получение данных</h2>
    <img :src="loadingImage" alt="loading" class="w-24 m-auto" />
  </main>
</template>

<script>
import { fetchCovidData } from "@/api";
import DataTitle from "@/components/DataTitle.vue";
import DataBoxes from "@/components/DataBoxes.vue";
import CountrySelect from "@/components/CountrySelect.vue";

export default {
  name: "Home",
  data() {
    return {
      loading: true,
      title: "Global",
      dataDate: "",
      stats: {},
      countries: [],
      loadingImage: require("@/assets/spinner.gif"),
    };
  },
  components: { DataTitle, DataBoxes, CountrySelect },
  methods: {
    async getCovid() {
      try {
        const data = await fetchCovidData();
        this.dataDate = data.Date;
        this.stats = data.Global;
        this.countries = data.Countries;
        this.loading = false;
      } catch (error) {
        console.error("Ошибка", error);
      }
    },
    getCountryData(country) {
      this.stats = country;
      this.title = country.Country;
    },
  },
  mounted() {
    this.getCovid();
  },
};
</script>
