# Grupparbete


Grupp medlemmar:
   Egil Ramsten
   Johan Skoog
   Paulus Kamuntavicius
   Philip Rasmussen
   Amelie Salomonsen?

Arbetsupplägg
   Daily stand-up 10:00
   Möte på kvällen 20:00

   Vi kommer att dela upp arbete på daily-standup och planera dagen.
   Sedan sammanstråla på kvällen och stämma av hur det går.

Komponenter
-- Src
|   |-- components
|   |   |-- Top.jsx = Samma för båda kort
|   |   |-- Card.jsx = Samma för båda kort
|   |	|-- Stack.jsx = Unik för Home
|   |   |-- Buttton.jsx = Samma för båda
|   |   |-- Form.jsx Unik för AddCard --> Paulus
Errorpage --> Egil


CSS 

   width 414px
   height 896px
   font: Source sans.
   	size 35px
   	weight 700
   	

   cards 
   width 382px
   height 241px

   radius 8px

   Font på kort "PT mono"
   	size 29px, 18px 12px
   	weight 400

   font på knappen "PT mono"
   	size 22px
   	weight 700

   font på form: PT mono
   	size: 18px 12px
   	weight 400

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
