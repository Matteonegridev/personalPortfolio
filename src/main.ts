import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// Installing oh-vue-icons:
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiGithub } from "oh-vue-icons/icons";
import { MdLanguage } from "oh-vue-icons/icons";
import { ViFileTypeReactjs } from "oh-vue-icons/icons";
import { ViFileTypeTailwind } from "oh-vue-icons/icons";
addIcons(BiGithub, MdLanguage, ViFileTypeReactjs, ViFileTypeTailwind);

const app = createApp(App);

app.component("v-icon", OhVueIcon);
app.mount("#app");
