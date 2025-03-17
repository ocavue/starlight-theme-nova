import { registerCustomElement } from '@aria-ui/core'
import {
  TooltipContentElement,
  TooltipRootElement,
  TooltipTriggerElement,
} from '@aria-ui/tooltip/elements'

export function register() {
  registerCustomElement('twoslash-content', TooltipContentElement)
  registerCustomElement('twoslash-root', TooltipRootElement)
  registerCustomElement('twoslash-trigger', TooltipTriggerElement)
}
