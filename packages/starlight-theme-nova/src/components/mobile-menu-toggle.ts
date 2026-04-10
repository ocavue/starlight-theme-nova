import type { HostElement } from '@aria-ui/core'
import {
  createSignal,
  defineCustomElement,
  useEffect,
  useEventListener,
} from '@aria-ui/core'

function setupMobileMenuToggle(host: HostElement) {
  const { get: getExpanded, set: setExpanded } = createSignal(false)

  const toggleExpanded = () => setExpanded(!getExpanded())

  useEffect(host, () => {
    const expanded: boolean = getExpanded()
    host.setAttribute('aria-controls', expanded ? 'true' : 'false')
    document.body.toggleAttribute(
      'data-mobile-menu-expanded',
      expanded || false,
    )
  })

  useEventListener(host, 'click', toggleExpanded)
  useEventListener(host, 'keydown', (event) => {
    if (!event.isComposing && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      toggleExpanded()
    }
  })

  useEffect(host, () => {
    const sidebarNav = document.getElementById('nova-sidebar-nav')
    if (!sidebarNav) return
    const handleKeyup = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        setExpanded(false)
        host.focus()
      }
    }
    sidebarNav.addEventListener('keyup', handleKeyup)
    return () => sidebarNav.removeEventListener('keyup', handleKeyup)
  })

  useEffect(host, () => {
    host.setAttribute('role', 'button')
    host.setAttribute('tabindex', '0')
  })
}

const MobileMenuToggle = defineCustomElement(setupMobileMenuToggle, {})

function register() {
  customElements.define('nova-mobile-menu-toggle', MobileMenuToggle)
}

export { register }
