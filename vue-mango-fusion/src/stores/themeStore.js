import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore('ThemeStore', () => {

    const theme = ref('dark');

    setTheme = (newTheme) =>{
        theme.value = newTheme;
        document.body.setAttribute('data-bs-theme', theme.value);
    }

    return {
        theme,
        setTheme
    }
});