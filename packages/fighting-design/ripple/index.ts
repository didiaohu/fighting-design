import Ripple from './src/ripple.vue'

import { install } from '../_utils'

export const FRipple = /* @__PURE__ */ install(Ripple)

export type RippleInstance = InstanceType<typeof Ripple>
