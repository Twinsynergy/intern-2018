<template>
  <div>
    <!-- <div class="alert alert-light">
      <p>
        <v-icon style=" font-size: 150px;">mood_bad</v-icon>
      </p>
      <h1>ไม่พบเพจที่ต้องการ</h1>
      <br>
      <div>
        <v-btn small fab outline color="blue" @click="addButton">
          <v-icon>add</v-icon>
        </v-btn>
        <br>
        <span class="text-sm">ย้อนกลับ</span>
      </div>
    </div>-->
    <v-container fill-height>
      <v-layout row wrap align-center>
        <v-flex class="text-xs-center">
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <p>
            <v-icon style=" font-size: 150px;">mood_bad</v-icon>
          </p>
          <h1 class="text-xs-center">ไม่พบเพจที่ต้องการ</h1>
          <br>
          <div>
            <v-btn small fab outline color="blue" @click="back">
              <v-icon>navigate_before</v-icon>
            </v-btn>
            <br>
            <span class="text-sm">ย้อนกลับ</span>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
    methods: {
    back: function() {
      this.$router.go(-1);
    }
    }
}
</script>
