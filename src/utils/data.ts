import mockup1 from "../public/assets/img/mockup-p1.png";

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
    description: "Get inspired and create your own recipe!",
    tech: [
      "vi-file-type-reactjs",
      "vi-file-type-tailwind",
      "vi-file-type-mongo",
      "si-express",
    ],
    github: "https://github.com/Matteonegridev/recipe-app",
    website: "https://yourecipecraft.netlify.app/",
  },
];
