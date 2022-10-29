<template>
  <div>
    <div class="text-center title">Proyecto Arquitectura Temperaturas SA</div>
    <div>
      <div class="margintop">
        <v-data-table
          :headers="headers"
          :header-props="headerProps"
          :items-per-page="15"
          :items="filteredTemps"
          class="elevation-1"
          no-data-text="No Resultados"
          no-results-text="No Resultados"
        >
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import tempService from "../services/tempService";
import swalMixin from "../mixins/swalMixin";
export default {
  mixins: [swalMixin],
  data: () => ({
    headerProps: {
      sortByText: "Ordenar Por",
    },

    headers: [
      { text: "ID", value: "id" },
      { text: "Temperatura Corporal", value: "temp_corp" },
      { text: "Temperatura Ambiente", value: "temp_amb" },
      { text: "Fecha Registrada", value: "created_at" },
      { text: "Ubicacion", value: "ubicacion" },
    ],
    temps: [],
  }),
  mounted() {
    this.getAllTemps();
  },
  computed: {
    filteredTemps() {
      const { isOdd } = this;
      return this.temps.map((temp) => {
        return {
          ...temp,
          ubicacion: isOdd(temp.id) ? "Ubicacion 2" : "Ubicacion 1",
        };
      });
    },
  },
  methods: {
    async getAllTemps() {
      try {
        const { data } = await tempService.getAll();
        this.temps = data;
        this.successAlert("Temperaturas actualizadas correctamente");
      } catch (error) {
        this.errorAlert("Se ha producido un error");
      }
    },
    isOdd(num) {
      return num % 2;
    },
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
}
</style>
