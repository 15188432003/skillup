import Vue from "vue";
import VueRouter from "vue-router"



Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        redirect: "/home"
    }, {
        path: "/home",
        component: ()=>import("@/views/home/index")
    }, {
        path: "/about",
        component: ()=>import("@/views/about/index")
    }]
const router = new VueRouter({
    routes
})


export default router

