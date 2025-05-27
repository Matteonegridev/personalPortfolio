import mockup1 from "/assets/img/mockup-p1.png";
import mockupGreenprints from "/assets/img/mockup-greenprints.png";
import mockupForm from "/assets/img/mockup-form.png";
import mockupMeisapp from "/assets/img/mockup-meisapp.png";
import mockupEquityease from "/assets/img/mockup-equit.png";

type Project = {
  image: string;
  name: string;
  description: string;
  tech: string[];
  github: string;
  website: string;
}[];

export const projects: Project = [
  {
    image: mockup1,
    name: "Recipe Craft",
    description:
      "Web application that allows the user to register/login, create recipes and get inspired by. Built with MERN stack. ",
    tech: [
      "vi-file-type-reactjs",
      "vi-file-type-tailwind",
      "vi-file-type-mongo",
      "si-express",
    ],
    github: "https://github.com/Matteonegridev/recipe-app",
    website: "https://yourecipecraft.netlify.app/",
  },
  {
    image: mockupGreenprints,
    name: "Greenprints",
    description:
      "Given your flight route, calculate your footprint and its enviromental impact. ",
    tech: [
      "vi-file-type-reactjs",
      "vi-file-type-tailwind",
      "vi-file-type-node",
    ],
    github: "https://github.com/Matteonegridev/GreenPrints",
    website: "https://greenprints.netlify.app/",
  },
  {
    image: mockupForm,
    name: "Gaming Lorem",
    description: "Gaming multi-step form with the choice of different plans!",
    tech: [
      "vi-file-type-reactjs",
      "vi-file-type-tailwind",
      "vi-file-type-typescript-official",
    ],
    github: "https://github.com/Matteonegridev/MultiStep-form",
    website: "https://gaminglorem.netlify.app/",
  },
  {
    image: mockupMeisapp,
    name: "MeisApp",
    description:
      "Web meditation app that allows you to chose between four relaxing japanese sounds. Built with React.js and Tailwind.",
    tech: [
      "vi-file-type-reactjs",
      "vi-file-type-typescript-official",
      "vi-file-type-tailwind",
    ],
    github: "https://github.com/Matteonegridev/MeisApp",
    website: "https://meisapp.netlify.app/",
  },
  {
    image: mockupEquityease,
    name: "Equityease",
    description:
      "Web application for calculate your mortgage interest and repayment.",
    tech: [
      "vi-file-type-reactjs",
      "vi-file-type-sass",
      "vi-file-type-typescript-official",
    ],
    github: "https://github.com/Matteonegridev/EquityEase",
    website: "https://equityease.netlify.app",
  },
];
