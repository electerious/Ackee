import { useEffect } from 'react'

export default () => {
  useEffect(() => {
    const isWindows = navigator.platform.includes('Win') === true
    if (!isWindows) return

    // Use custom scrollbars on Windows because they look ugly
    document.body.classList.add('customScrollbar')
    return () => document.body.classList.remove('customScrollbar')
  }, [])
}
