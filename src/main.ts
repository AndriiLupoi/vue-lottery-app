import 'bootstrap/dist/js/bootstrap.bundle.js'
import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import Home from "@/components/HomeComp.vue";
import type {RouteRecordRaw} from "vue-router";
import AboutComp from "@/components/AboutComp.vue";
import LotteryComp from "@/components/LotteryComp.vue";
import {createRouter, createWebHashHistory} from "vue-router";
import axios from "axios";
import UserComp from "@/components/UserComp.vue";
import LoginComp from "@/components/LoginComp.vue";

axios.defaults.baseURL = "https://api.escuelajs.co/api/v1/";

const routes: RouteRecordRaw[] = [
    {path: "/", component: Home},
    {path: "/about", component: AboutComp},
    {path: "/login", component: LoginComp},
    {path: "/lottery", component: LotteryComp},
    {path: "/users/:id", component: UserComp}
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
    linkActiveClass: 'link-active'
})

createApp(App)
    .use(router)
    .mount('#app')
