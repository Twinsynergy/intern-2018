<template>
  <div>
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
      </ol>
    </div>
    <br>
    <div class="row">
      <div class="col-lg-8">
        <div class="alert alert-light">
          <v-card-title primary>
            <h3>ตำแหน่งพนักงานทั้งหมด</h3>
          </v-card-title>
          <v-divider></v-divider>

          <br>
          <el-table v-if="!loadTable" width="100%" height="346"></el-table>
          <fusioncharts
            v-if="loadTable"
            :type="type"
            :width="width"
            :height="height"
            :dataFormat="dataFormat"
            :dataSource="dataSource"
          ></fusioncharts>

          <br>
          <br>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="alert alert-light">
          <v-card-title primary>
            <h3>Manday</h3>
          </v-card-title>
          <v-divider></v-divider>
          <div>
            <el-table
              :default-sort="{prop: 'manday', order: 'descending'}"
              :data="selling"
              style="width: 100%"
              height="409"
            >
              <el-table-column label="พนักงาน" width="250">
                <template slot-scope="scope">
                  <v-icon>face</v-icon>
                  <span
                    style="margin-left: 10px"
                  >{{ scope.row.emp_name}} ({{ scope.row.emp_nickname}})</span>
                </template>
              </el-table-column>
              <el-table-column prop="manday" label="ราคา" sortable width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    <font color="#4AD991">{{ Number(scope.row.manday).toLocaleString()}}</font>
                  </span>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">บาท</template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="alert alert-light">
          <v-card-title primary>
            <h3>Project Sell</h3>
          </v-card-title>

          <v-divider></v-divider>
          <div>
            <el-table
              :data="project"
              style="width: 100%"
              height="290"
              :default-sort="{prop: 'project_total_selling', order: 'descending'}"
            >
              <el-table-column label="โปรเจค" width="500" prop="project_name" sortable>
                <template slot-scope="scope">
                  <v-icon>assignment</v-icon>
                  <span style="margin-left: 10px">{{ scope.row.project_name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="ลูกค้า" width="280" prop="project_costomer_name" sortable>
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.project_costomer_name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="   ราคาต้นทุน" width="120" prop="project_total_cost" sortable>
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    <font
                      color="#f442b9"
                      style="text-align: right;"
                    >{{ Number(scope.row.project_total_cost).toLocaleString()}}</font>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label>
                <template slot-scope="scope">
                  <span style="margin-left: 10px">บาท</span>
                </template>
              </el-table-column>
              <el-table-column label="   ราคาขาย" width="120" prop="project_total_selling" sortable>
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    <font
                      color="#4AD991"
                    >{{ Number(scope.row.project_total_selling).toLocaleString()}}</font>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label>
                <template slot-scope="scope">
                  <span style="margin-left: 10px">บาท</span>
                </template>
              </el-table-column>
            </el-table>
            <br>
            <br>
            <span class="text-xs-right">
              <h4>
                ราคาต้นทุนทั้งหมด
                <font color="#f442b9">
                  <b>{{ Number(projectTotal.allproject_cost).toLocaleString()}}</b>
                </font> บาท | ราคาขายทั้งหมด
                <font color="#4AD991">
                  <b>{{ Number(projectTotal.allproject_selling).toLocaleString()}}</b>
                </font> บาท
              </h4>
            </span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      type: "column2d", // The chart type
      width: "100%", // Width of the chart
      height: "346", // Height of the chart
      dataFormat: "json", // Data type
      dataSource: {
        // Chart Configuration
        chart: {
          numbersuffix: "คน ",
          showpercentvalues: "1",
          aligncaptionwithcanvas: "0",
          captionpadding: "0",
          decimals: "1",
          plottooltext: "พนักงานในตำแหน่ง <b>$label</b> มี <b>$value</b> คน",
          centerlabel: "$value คน",
          theme: "fusion"
        },
        // Chart Data
        data: []
      },
      show: false,
      loadTable: false,
      selling: [],
      headers: [],
      project: [],
      PositionData: [],
      projectTotal: [],
      PositionAll: []
    };
  },
  mounted() {
    this.getSellData();
    this.getProjectData();
    this.getPositionData();
    this.loadTableView();
  },
  methods: {
    loadTableView() {
      setTimeout(() => {
        this.loadTable = true;
      }, 400);
    },
    getSellData: function() {
      axios
        .get("http://api:3030/manday/emp/datatable", {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => (this.selling = response.data.data));
    },
    getProjectData: function() {
      axios
        .get("http://api:3030/projectmanage/datatable", {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(
          response => (
            (this.project = response.data.data),
            (this.projectTotal = response.data)
          )
        );
    },
    getPositionData: function() {
      axios
        .get("http://api:3030/dashboard/position", {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(
          response => (
            (this.dataSource.data = response.data.data),
            (this.PositionAll = response.data)
          )
        )
        .catch(err => {
          console.log(err.response.status);
          if (err.response.status == 401) {
            Swal.fire({
              type: "warning",
              title: "กรุณาเข้าสู่ระบบใหม่",
              showConfirmButton: true
            });
            localStorage.clear();
            this.$store.state.getApiData.tokenkey = null;
          }
          if (err.response.status == 404) {
            Swal.fire({
              type: "warning",
              title: "เกิดข้อผิดพลาด",
              showConfirmButton: true
            });
          }
        });
    }
  }
};
</script>
<style>
g[class$="creditgroup"] {
  display: none !important;
}
h1 {
  text-align: left;
}
</style>
