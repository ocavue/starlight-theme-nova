import type { BaseElement } from '@aria-ui/core'
import {
  createSignal,
  defineCustomElement,
  useAriaAttribute,
  useEffect,
  useEventListener,
} from '@aria-ui/core'

function setupMobileMenuToggle(host: BaseElement) {
  const expanded = createSignal(false)

  useAriaAttribute(host, 'aria-expanded', () => {
    switch (expanded.get()) {
      case true:
        return 'true'
      case false:
        return 'false'
      default:
        return undefined
    }
  })

  useEffect(host, () => {
    document.body.toggleAttribute(
      'data-mobile-menu-expanded',
      expanded.get() || false,
    )
  })

  const closeOnEscape = (event: KeyboardEvent) => {
    if (event.code === 'Escape') {
      expanded.set(false)
      host.focus()
    }
  }

  useEffect(host, () => {
    const parentNav = host.closest('nav')
    parentNav?.addEventListener('keyup', closeOnEscape)
  })

  function toggleExpanded() {
    expanded.set(!expanded.get())
  }

  useEventListener(host, 'click', toggleExpanded)

  useEventListener(host, 'click', toggleExpanded)
}

const MobileMenuToggle = defineCustomElement({
  props: {},
  events: {},
  setup: setupMobileMenuToggle,
})

function register() {
  customElements.define('nova-mobile-menu-toggle', MobileMenuToggle)
}

export { register }
