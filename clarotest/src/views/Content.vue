<template>
  <div>
    <TabView>
      <TabPanel header="NBA Players">
        <div class="filter" v-on:keyup.enter.prevent="search">
          <span class="p-input-icon-left">
            <i class="pi pi-search" @click="search" />
            <InputText type="text" v-model="search_word" placeholder="Search" />
          </span>

          <Dropdown
            v-model="selectedFilter"
            :options="options"
            optionLabel="name"
            placeholder="Select a Filter"
          />
          <div @click="clear" class="trash_icon">
            <i class="pi pi-trash"></i>
          </div>
        </div>

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
            <div>
              <table>
                <tr class="headers">
                  <td>NAME</td>
                  <td>CONFERENCE</td>
                  <td>ABBEVIATION</td>
                  <td>FULL NAME</td>
                  <td>DIVISION</td>
                  <td>CITY</td>
                </tr>
                <tr class="values">
                  <td>{{ content.name }}</td>
                  <td>{{ content.conference }}</td>
                  <td>{{ content.abbreviation }}</td>
                  <td>{{ content.full_name }}</td>
                  <td>{{ content.division }}</td>
                  <td>{{ content.city }}</td>
                </tr>
              </table>
            </div>
          </Dialog>
        </DataTable>
        <div v-if="noMatch">
          No search result were found
        </div>
      </TabPanel>
      <TabPanel header="Form">
        <div>
          <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col">
              <InputText
                id="first-name"
                type="text"
                v-model="form.first_name"
                placeholder="First Name"
              />
            </div>
            <div class="p-field p-col">
              <InputText
                id="last-name"
                type="text"
                v-model="form.last_name"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col">
              <InputNumber
                v-model="form.height_feet"
                :min="0"
                :max="10"
                mode="decimal"
                :minFractionDigits="2"
                :maxFractionDigits="5"
                placeholder="Height in Feet"
                suffix=" ft"
              />
            </div>
            <div class="p-field p-col">
              <InputNumber
                v-model="form.height_inches"
                :min="0"
                :max="10"
                mode="decimal"
                :minFractionDigits="2"
                :maxFractionDigits="5"
                placeholder="Height in Inches"
                suffix=" in"
              />
            </div>
          </div>
          <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col">
              <InputNumber
                v-model="form.weight"
                :min="0"
                :max="10"
                mode="decimal"
                :minFractionDigits="2"
                :maxFractionDigits="5"
                placeholder="Weight"
                suffix=" wt"
              />
            </div>
            <div class="p-field p-col">
              <Dropdown
                v-model="form.selectedPosition"
                :options="positions"
                optionLabel="name"
                placeholder="Select a position"
              />
            </div>
          </div>
          <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col">
              <Calendar
                id="navigators"
                v-model="form.born_date"
                :monthNavigator="true"
                :yearNavigator="true"
                yearRange="1980:2021"
                placeholder="Born Date"
                @date-select="calcAge"
              />
            </div>
            <div class="p-field p-col">
              <InputNumber
                v-model="form.age"
                placeholder="Age"
                disable
              />
            </div>
          </div>
        </div>
        <div>
            {{form}}
        </div>
      </TabPanel>
    </TabView>
    <Button style="display:none" @click="getPlayers">call API</Button>

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
      this.ogList = players.data.data;
    } catch (err) {
      console.log(err);
    }
  },

  data() {
    return {
      players: [],
      ogList: [],
      expandedRows: [],
      display: false,
      search_word: "",
      selectedFilter: null,
      noMatch: false,
      options: [
        { name: "First Name" },
        { name: "Last Name" },
        { name: "Position" },
      ],
      positions: [
        { name: "A" },
        { name: "B" },
        { name: "C" },
        { name: "D" },
        { name: "E" },
      ],

      content: {
        abbreviation: "",
        city: "",
        conference: "",
        division: "",
        full_name: "",
        name: "",
      },
      form: {
        first_name: "",
        last_name: "",
        height_feet: null,
        height_inches: null,
        weight: null,
        born_date: null,
        age: null,
        selectedPosition: null,
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
    search() {
      if (this.search_word && this.selectedFilter) {
        let filter = [];
        for (const player of this.players) {
          if (
            this.selectedFilter.name == "First Name" &&
            player.first_name == this.search_word
          ) {
            filter.push(player);
          } else if (
            this.selectedFilter.name == "Last Name" &&
            player.last_name == this.search_word
          ) {
            filter.push(player);
          } else if (
            this.selectedFilter.name == "Position" &&
            player.position == this.search_word
          ) {
            filter.push(player);
          }
        }
        if (filter.length > 0) {
          console.log("filter", filter);
          this.players = filter;
        } else {
          this.players = [];
          this.noMatch = true;
        }
      }
    },
    clear() {
      this.players = this.ogList;
      this.noMatch = false;
    },
    calcAge(){
        const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
        this.form.age = getAge(this.form.born_date)
        console.log(getAge(this.form.born_date), "Age")
    }
  },
};
</script>

<style lang="scss" scoped>
table,
th,
td {
  border: 1px solid black;
  overflow-wrap: break-word;
}
.filter {
  text-align: left;
  display: flex;
}

.trash_icon {
  cursor: pointer;
  margin: 10px 10px;
}
.pi-search {
  cursor: pointer;
}
</style>
