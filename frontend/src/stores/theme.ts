import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)
  
  function toggleTheme() {
    isDark.value = !isDark.value
    applyTheme()
    localStorage.setItem('syslog-dark', String(isDark.value))
  }
  
  function initTheme() {
    const saved = localStorage.getItem('syslog-dark')
    if (saved !== null) {
      isDark.value = saved === 'true'
    }
    applyTheme()
  }
  
  function applyTheme() {
    const root = document.documentElement
    
    root.classList.toggle('dark-mode', isDark.value)
    root.classList.toggle('light-mode', !isDark.value)
    
    const darkTheme = {
      '--bg-primary': '#0d0d12',
      '--bg-secondary': '#16161d',
      '--bg-card': '#1a1a24',
      '--bg-hover': 'rgba(255, 255, 255, 0.06)',
      '--bg-active': 'rgba(10, 132, 255, 0.15)',
      '--text-primary': '#ffffff',
      '--text-secondary': '#c8c8ce',
      '--text-muted': '#8e8e93',
      '--border-color': 'rgba(255, 255, 255, 0.08)',
      '--accent-color': '#0a84ff',
      '--accent-hover': '#409cff',
      '--success-color': '#32d74b',
      '--warning-color': '#ffd60a',
      '--danger-color': '#ff453a',
      '--sidebar-bg': '#0d0d12',
      '--card-shadow': '0 4px 20px rgba(0, 0, 0, 0.5)',
    }
    
    const lightTheme = {
      '--bg-primary': '#f5f5f7',
      '--bg-secondary': '#ffffff',
      '--bg-card': '#ffffff',
      '--bg-hover': 'rgba(0, 0, 0, 0.04)',
      '--bg-active': 'rgba(10, 132, 255, 0.1)',
      '--text-primary': '#1d1d1f',
      '--text-secondary': '#555558',
      '--text-muted': '#86868b',
      '--border-color': 'rgba(0, 0, 0, 0.08)',
      '--accent-color': '#007aff',
      '--accent-hover': '#0056b3',
      '--success-color': '#34c759',
      '--warning-color': '#ff9500',
      '--danger-color': '#ff3b30',
      '--sidebar-bg': '#f5f5f7',
      '--card-shadow': '0 2px 12px rgba(0, 0, 0, 0.06)',
    }
    
    const theme = isDark.value ? darkTheme : lightTheme
    
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }
  
  return {
    isDark,
    toggleTheme,
    initTheme
  }
})
