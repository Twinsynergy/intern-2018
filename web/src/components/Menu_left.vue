<template>
  <div>
    <v-container v-if="$store.state.getApiData.status === 'Power Admin'">
      <v-list dense>
        <br>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/project">
          <v-list-tile-action>
            <v-icon>assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>จัดการโปรเจค</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/emp">
          <v-list-tile-action>
            <v-icon>supervisor_account</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>จัดการพนักงาน</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/position">
          <v-list-tile-action>
            <v-icon>work</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>จัดการตำแหน่ง</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/branch">
          <v-list-tile-action>
            <v-icon>account_balance</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>จัดการสาขา</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- 
          <v-list-tile to="/leaves">
            <v-list-tile-action>
              <v-icon>date_range</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>จัดการวันลา</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>-->
        <br>
        <!-- <div v-if="!developerMode">
            <span style=" color: #afafaf" class="text-sm">--- developer only ---</span>
            <v-list-tile to="/developerMode">
              <v-list-tile-action>
                <v-icon>new_releases</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>API LAB</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/developerMode2">
              <v-list-tile-action>
                <v-icon>new_releases</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>UPLOAD TEST</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
        </div>-->
      </v-list>
    </v-container>

    <v-container v-if="$store.state.getApiData.status === 'Admin'">
      <v-list dense class="pt-0">
        <br>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/project">
          <v-list-tile-action>
            <v-icon>assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>จัดการโปรเจค</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/emp">
          <v-list-tile-action>
            <v-icon>supervisor_account</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>จัดการพนักงาน</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/position">
          <v-list-tile-action>
            <v-icon>work</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>จัดการตำแหน่ง</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/branch">
          <v-list-tile-action>
            <v-icon>account_balance</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>จัดการสาขา</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-container>

    <v-container v-if="$store.state.getApiData.status === 'Human resources'">
      <v-list dense class="pt-0">
        <br>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/project">
          <v-list-tile-action>
            <v-icon>assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>จัดการโปรเจค</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/emp">
          <v-list-tile-action>
            <v-icon>supervisor_account</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>จัดการพนักงาน</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/branch">
          <v-list-tile-action>
            <v-icon>account_balance</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>จัดการสาขา</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-container>
  </div>
</template>

<script scoped>
export default {
  data() {
    return {
      developerMode: false
    };
  }
};
</script>

<style scoped>
</style>

