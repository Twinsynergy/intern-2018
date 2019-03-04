<template>
  <div>Test API Array Push
    <el-button size="mini" icon="el-icon-tickets" circle @click="saveDataAddit();"></el-button>
    <br>
    {{ruleFormAddit.pusharray[0]}}
    <br>
    {{ruleFormAddit.pusharray[1]}}
    <br>
    {{ruleFormAddit.pusharray[2]}}
    <br>
    {{ruleFormAddit.pusharray[3]}}
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dataBlock: " ",
      ruleFormAddit: {
        pusharray: [
          {
            project_addit_title: "1",
            project_addit_price: "30000",
            project_id: "6"
          },
                    {
            project_addit_title: "2",
            project_addit_price: "40000",
            project_id: "6"
          },
                    {
            project_addit_title: "3",
            project_addit_price: "40000",
            project_id: "6"
          },
                    {
            project_addit_title: "4",
            project_addit_price: "40000",
            project_id: "6"
          },
          {
            project_addit_title: "5",
            project_addit_price: "40000",
            project_id: "6"
          },
          {
            project_addit_title: "6",
            project_addit_price: "5000",
            project_id: "6"
          }
        ]
      }
    };
  },
  methods: {
    saveDataAddit: function() {
      let apiURL = "http://178.128.80.240:3030/array";
      this.axios
        .post(apiURL, this.ruleFormAddit)
        .then(response => {
          console.log("ok2");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>