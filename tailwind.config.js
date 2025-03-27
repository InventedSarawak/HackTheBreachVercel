/** @type {import('tailwindcss').Config} */

const Config = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                mono: ['var(--font-space-mono)', 'monospace']
            }
        }
    },
    plugins: []
}
export default config
