import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// Installing oh-vue-icons:
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiGithub } from "oh-vue-icons/icons";
import { MdLanguage } from "oh-vue-icons/icons";
import { ViFileTypeReactjs } from "oh-vue-icons/icons";
import { ViFileTypeTailwind } from "oh-vue-icons/icons";
import { ViFileTypeNode } from "oh-vue-icons/icons";
import { ViFileTypeMongo } from "oh-vue-icons/icons";
import { SiExpress } from "oh-vue-icons/icons";
import { ViFileTypeSass } from "oh-vue-icons/icons";
import { ViFileTypeTypescriptOfficial } from "oh-vue-icons/icons";

addIcons(
  BiGithub,
  MdLanguage,
  ViFileTypeReactjs,
  ViFileTypeTailwind,
  ViFileTypeNode,
  ViFileTypeMongo,
  SiExpress,
  ViFileTypeSass,
  ViFileTypeTypescriptOfficial,
);

const app = createApp(App);

app.component("v-icon", OhVueIcon);
app.mount("#app");
