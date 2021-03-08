<template>
  <div>
    <div>Dashboard</div>
    <Button style="display:none" @click="getPlayers">call API</Button>
    <DataTable
      :value="players"
      :paginator="true"
      :rows="25"
      :v-model:expandedRows="expandedRows"
      :rowsPerPageOptions="[25, 50, 100]"
      @row-expand="onRowExpand"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
    >
      <Column :expander="true" headerStyle="width: 3em" />
      <Column field="id" header="ID"></Column>
      <Column field="first_name" header="First Name"></Column>
      <Column field="last_name" header="Last Name"></Column>
      <Column field="height_feet" header="Height Feet"></Column>
      <Column field="height_inches" header="Height Inches"></Column>
      <Column field="position" header="Position"></Column>
      <Column field="weight_pounds" header="Weight Pounds"></Column>

      <Dialog header="Team Detail" v-model:visible="display">
        {{ content }}
      </Dialog>
    </DataTable>
  </div>
</template>

<script>
import axios from "axios";
export default {
  async mounted() {
    try {
      const players = await axios.get(
        "https://free-nba.p.rapidapi.com/players",
        {
          headers: {
            "x-rapidapi-key":
              "665ed21c81msh061a123159a7203p1bb178jsn2ddffd2c7093",
          },
          params: {
            page: "0",
            per_page: "100",
          },
        }
      );
      console.log(players.data);

      this.players = players.data.data;
    } catch (err) {
      console.log(err);
    }
  },

  data() {
    return {
      players: [],
      expandedRows: [],
      display: false,
      content: {
        abbreviation: "",
        city: "",
        conference: "",
        division: "",
        full_name: "",
        name: "",
      },
    };
  },
  methods: {
    async getPlayers() {
      try {
        const players = await axios.get(
          "https://free-nba.p.rapidapi.com/players",
          {
            headers: {
              "x-rapidapi-key":
                "665ed21c81msh061a123159a7203p1bb178jsn2ddffd2c7093",
              page: "2",
            },
            params: {
              per_page: "200",
            },
          }
        );
        console.log(players.data);

        this.players = players.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    onRowExpand(event) {
      console.log(event.data.team, "testing event");
      this.display = true;

      this.content.abbreviation = event.data.team.abbreviation;
      this.content.city = event.data.team.city;
      this.content.conference = event.data.team.conference;
      this.content.division = event.data.team.division;
      this.content.full_name = event.data.team.full_name;
      this.content.name = event.data.team.name;
    },
  },
};
</script>

<style lang="scss" scoped></style>
