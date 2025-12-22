/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "var(--color-primary)",
                "text-primary": "var(--color-text-primary)",
                "text-secondary": "var(--color-text-secondary)",
                "background-primary": "var(--color-background-primary)",
                "background-secondary": "var(--color-background-secondary)",
                unused: "var(--color-unused)",
            },
        },
    },
    plugins: [],
};
