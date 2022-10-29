<template>
  <div>
    <div class="text-center title">Proyecto Arquitectura Temperaturas SA</div>
    <div v-if="loading">
      <div class="loader-temp" style="margin-top: 2rem">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </div>
      <div class="text-center title" style="margin-top: 2rem">
        Cargando Temperaturas
      </div>
    </div>
    <div v-else>
      <div class="text-center title" style="margin-top: 2rem">
        Temperaturas Generales
      </div>

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
      <div class="text-center title" style="margin-top: 2rem">
        Rangos de Temperaturas
      </div>
      <div>
        <div class="margintop">
          <v-data-table
            :headers="headersAverage"
            :header-props="headerProps"
            :items-per-page="15"
            :items="averageTemps"
            class="elevation-1"
            no-data-text="No Resultados"
            no-results-text="No Resultados"
          >
          </v-data-table>
        </div>
      </div>
      <div class="title" style="margin-top: 2rem">
        Temperatura Corporal Promedio Ubicacion 1
      </div>
      <span style="font-weight: normal">{{
        isTempHigh(averageTempUbication1)
          ? `Alto Riesgo ${averageTempUbication1}`
          : `Bajo Riesgo ${averageTempUbication1}`
      }}</span>
      <div class="title" style="margin-top: 2rem">
        Temperatura Corporal Promedio Ubicacion 2
      </div>
      <span style="font-weight: normal">{{
        isTempHigh(averageTempUbication2)
          ? `Alto Riesgo ${averageTempUbication2}`
          : `Bajo Riesgo ${averageTempUbication2}`
      }}</span>
      <div class="title" style="margin-top: 2rem">
        Temperatura Ambiente Promedio Ubicacion 1
      </div>
      <span style="font-weight: normal">{{
        isTempAmbHigh(averageTempAmbUbication1)
          ? `Temperatura Incomoda ${averageTempAmbUbication1}`
          : `Temperatura Comoda ${averageTempAmbUbication1}`
      }}</span>
      <div class="title" style="margin-top: 2rem">
        Temperatura Ambiente Promedio Ubicacion 2
      </div>
      <span style="font-weight: normal">{{
        isTempAmbHigh(averageTempAmbUbication2)
          ? `Temperatura Incomoda ${averageTempAmbUbication2}`
          : `Temperatura Comoda ${averageTempAmbUbication2}`
      }}</span>
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
    headersAverage: [
      { text: "ID", value: "id" },
      { text: "Ubicacion", value: "ubicacion" },
      { text: "Rango Temperatura", value: "name" },
      { text: "Temperaturas Corporales Registradas", value: "tempCount" },
    ],
    temps: [],
    loading: false,
  }),
  mounted() {
    this.getAllTemps();
  },
  computed: {
    averageTempUbication1() {
      const { temps, isOdd } = this;
      // eslint-disable-next-line no-unused-vars
      let initialTemp = 0;
      // eslint-disable-next-line no-unused-vars
      let tempCount = 0;
      temps.forEach((element) => {
        if (!isOdd(element.id)) {
          tempCount++;
          initialTemp = initialTemp + parseFloat(element.temp_corp);
        }
      });
      return (initialTemp / tempCount).toFixed(2);
    },
    averageTempUbication2() {
      const { temps, isOdd } = this;
      // eslint-disable-next-line no-unused-vars
      let initialTemp = 0;
      // eslint-disable-next-line no-unused-vars
      let tempCount = 0;
      temps.forEach((element) => {
        if (isOdd(element.id)) {
          tempCount++;
          initialTemp = initialTemp + parseFloat(element.temp_corp);
        }
      });
      return (initialTemp / tempCount).toFixed(2);
    },
    averageTempAmbUbication1() {
      const { temps, isOdd } = this;
      // eslint-disable-next-line no-unused-vars
      let initialTemp = 0;
      // eslint-disable-next-line no-unused-vars
      let tempCount = 0;
      temps.forEach((element) => {
        if (!isOdd(element.id)) {
          tempCount++;
          initialTemp = initialTemp + parseFloat(element.temp_amb);
        }
      });
      return (initialTemp / tempCount).toFixed(2);
    },
    averageTempAmbUbication2() {
      const { temps, isOdd } = this;
      // eslint-disable-next-line no-unused-vars
      let initialTemp = 0;
      // eslint-disable-next-line no-unused-vars
      let tempCount = 0;
      temps.forEach((element) => {
        if (isOdd(element.id)) {
          tempCount++;
          initialTemp = initialTemp + parseFloat(element.temp_amb);
        }
      });
      return (initialTemp / tempCount).toFixed(2);
    },
    filteredTemps() {
      const { isOdd } = this;
      return this.temps.map((temp) => {
        return {
          ...temp,
          ubicacion: isOdd(temp.id) ? "Ubicacion 2" : "Ubicacion 1",
        };
      });
    },
    averageTemps() {
      const { temps, isTempHigh, isOdd } = this;
      // eslint-disable-next-line no-unused-vars
      let tempCountHigh1 = 0;
      // eslint-disable-next-line no-unused-vars
      let tempCountLow1 = 0;
      // eslint-disable-next-line no-unused-vars
      let tempCountHigh2 = 0;
      // eslint-disable-next-line no-unused-vars
      let tempCountLow2 = 0;
      temps.forEach((element) => {
        if (isTempHigh(element.temp_corp)) {
          if (isOdd(element.id)) tempCountHigh2++;
          else tempCountHigh1++;
        } else {
          if (isOdd(element.id)) tempCountLow2++;
          else tempCountLow1++;
        }
      });
      return [
        {
          id: 1,
          name: "Temperatura Alta",
          ubicacion: "Ubicacion 1",
          tempCount: tempCountHigh1,
        },
        {
          id: 2,
          name: "Temperatura Normal",
          ubicacion: "Ubicacion 1",
          tempCount: tempCountLow1,
        },
        {
          id: 3,
          name: "Temperatura Alta",
          ubicacion: "Ubicacion 2",
          tempCount: tempCountHigh2,
        },
        {
          id: 4,
          name: "Temperatura Normal",
          ubicacion: "Ubicacion 2",
          tempCount: tempCountLow2,
        },
      ];
    },
  },
  methods: {
    async getAllTemps() {
      this.loading = true;
      try {
        const { data } = await tempService.getAll();
        this.temps = data;
        this.successAlert("Temperaturas actualizadas correctamente");
      } catch (error) {
        this.errorAlert("Se ha producido un error");
      } finally {
        this.loading = false;
      }
    },
    isOdd(num) {
      return num % 2;
    },
    isTempHigh(temp) {
      const tempToFloat = parseFloat(temp);
      return tempToFloat > 30.0;
    },
    isTempAmbHigh(temp) {
      const tempToFloat = parseFloat(temp);
      return tempToFloat > 26.33;
    },
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
}
.loader-temp {
  display: flex;
  justify-content: center;
}
</style>
