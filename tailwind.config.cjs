/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,tsx}"],
    theme: {
        extend: {},
        colors: {
            primary: "rgb(var(--color-primary) / <alpha-value>)",
            secondary: "rgb(var(--color-secondary) / <alpha-value>)",
            accent1: "rgb(var(--color-accent1)/ <alpha-value>)",
            accent2: "rgb(var(--color-accent2) / <alpha-value>)",
        },
    },
    plugins: [],
};
