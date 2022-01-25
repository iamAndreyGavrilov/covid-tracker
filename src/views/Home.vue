<template>
  <main v-if="!loading">
    <DataTitle :text="title" :dataDate="dataDate" />
    <DataBoxes :stats="stats" />
    <CountrySelect @get-country="getCountryData" :countries="countries" />
    <button
      @click="clearCountryData"
      v-if="stats.Country"
      class="bg-green-700 text-white rounded p-3 mt-10 focus:outline-none hover:bg-green-600"
    >
      Clear Country
    </button>
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
    clearCountryData() {
      this.loading = true;
      this.getCovid();
      this.title = "Global";
    },
  },
  mounted() {
    this.getCovid();
  },
};
</script>
