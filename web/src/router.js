import Vue from "vue";
import Router from "vue-router";
const Home = () => import("./views/Dashboard.vue");
const Branch = () => import("./views/Branch.vue");
const BranchAdd = () => import("./views/page/branchAdd.vue");
const Project = () => import("./views/Project.vue");
const ProjectManage = () => import("./views/page/Projectpage/projectManage.vue");
const ProjectTeamManage = () => import("./views/page/Projectpage/projectTeamManage.vue");
const ProjectSprint = () => import("./views/page/Projectpage/projectSprintDate.vue");
const ProjectPositionTeamManage = () => import("./views/page/Projectpage/projectEmpSelect.vue");
const ProjectAdd = () => import("./views/page/projectAdd.vue");
const ProjectDetail = () => import("./views/page/projectView.vue");
const Employee = () => import("./views/Employee.vue");
const Positionv = () => import("./views/Positionv.vue");
const PositionAdd = () => import("./views/page/positionAdd.vue");
const Leaves = () => import("./views/Leaves.vue");
const LeavesAdd = () => import("./views/page/leaveAdd.vue");
const EmpAdd = () => import("./views/page/empAdd.vue");
const EmpPosition = () => import("./views/page/empPosition/empPosition.vue");
const empPositionAdd = () => import("./views/page/empPosition/empPositionAdd.vue");
const empBenefit = () => import("./views/page/empBenefit.vue");
const empBenefitAdd = () => import("./views/page/empBenefit/empBenefitAdd.vue");
const empBenefitDetail = () => import("./views/page/empBenefit/empBenefitDetail.vue");
const empdetail = () => import("./views/page/empDetail.vue");
const leavesdetail = () => import("./views/page/leaveDetail.vue");
const positiondetail = () => import("./views/page/positionDetail.vue");
const branchdetail = () => import("./views/page/branchDetail.vue");
const branchcost = () => import("./views/page/branchCost.vue");
const branchcostAdd = () => import("./views/page/branchCostpage/branchCostAdd.vue");
const branchadditAdd = () => import("./views/page/branchCostpage/branchAdditAdd.vue");
const branchfixcostdetail = () => import("./views/page/branchCostpage/branchCostDetail.vue");
const branchadditdetail = () => import("./views/page/branchCostpage/branchAdditDetail.vue");
const NotFoundComponent = () => import("./views/page/NotFound.vue");
const dev1 = () => import("./views/input.vue");
const dev2 = () => import("./views/upload.vue");

Vue.use(Router);

const router = new Router({
  routes: [
    { path: "*", component: NotFoundComponent },
    {
      path: "/",
      name: "dashboard",
      component: Home
    },
    {
      path: "/branch",
      name: "branch",
      component: Branch
    },
    {
      path: "/branch/add",
      name: "branchAdd",
      component: BranchAdd
    },
    {
      path: "/project",
      name: "project",
      component: Project
    },
    {
      path: "/project/add",
      name: "projectAdd",
      component: ProjectAdd
    },
    {
      path: "/project/manage/:projectID",
      name: "ProjectManage",
      component: ProjectManage
    },
    {
      path: "/project/detail/team/:projectID",
      name: "ProjectTeamManage",
      component: ProjectTeamManage
    },
    {
      path: "/project/detail/team/:projectID/sprint/:teamID",
      name: "ProjectSprint",
      component: ProjectSprint
    },
    {
      path: "/project/detail/team/selectEmp/:projectID/:positionID",
      name: "ProjectPositionTeamManage",
      component: ProjectPositionTeamManage
    },
    {
      path: "/project/detail/:projectID",
      name: "projectDetail",
      component: ProjectDetail
    },
    {
      path: "/emp",
      name: "employee",
      component: Employee
    },
    {
      path: "/position",
      name: "position",
      component: Positionv
    },
    {
      path: "/position/add",
      name: "positionAdd",
      component: PositionAdd
    },
    {
      path: "/leaves",
      name: "leaves",
      component: Leaves
    },
    {
      path: "/leaves/add",
      name: "leavesAdd",
      component: LeavesAdd
    },
    {
      path: "/emp/add",
      name: "empAdd",
      component: EmpAdd
    },
    {
      path: "/emp/position/:empID",
      name: "empPosition",
      component: EmpPosition
    },
    {
      path: "/emp/position/add/:empID",
      name: "empPositionAdd",
      component: empPositionAdd
    },
    {
      path: "/emp/Benefit/:empID",
      name: "empBenefit",
      component: empBenefit
    },
    {
      path: "/emp/Benefit/add/:empID",
      name: "empBenefitAdd",
      component: empBenefitAdd
    },
    {
      path: "/emp/Benefit/Detail/:BenefitID",
      name: "empBenefitDetail",
      component: empBenefitDetail
    },
    {
      path: "/emp/detail/:empID",
      name: "empdetail",
      component: empdetail
    },
    {
      path: "/leaves/detail/:leavesID",
      name: "leavesdetail",
      component: leavesdetail
    },
    {
      path: "/position/detail/:positionID",
      name: "positiondetail",
      component: positiondetail
    },
    {
      path: "/branch/detail/:branchID",
      name: "branchdetail",
      component: branchdetail
    },
    {
      path: "/branch/cost/:branchID",
      name: "branchcost",
      component: branchcost
    },
    {
      path: "/branch/fixcost/add/:branchID",
      name: "branchcostAdd",
      component: branchcostAdd
    },
    {
      path: "/branch/additcost/add/:branchID",
      name: "branchadditAdd",
      component: branchadditAdd
    },
    {
      path: "/branch/fixcost/detail/:CostID",
      name: "branchfixcostdetail",
      component: branchfixcostdetail
    },
    {
      path: "/branch/addit/detail/:AdditID",
      name: "branchadditdetail",
      component: branchadditdetail
    },
    {
      path: "/developerMode",
      name: "adds",
      component: dev1
    },
    {
      path: "/developerMode2",
      name: "Dev",
      component: dev2
    }
  ]
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // eslint-disable-next-line no-undef
    NProgress.start();
  }
  next();
});
// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  // eslint-disable-next-line no-undef
  NProgress.done();
});

export default router;
