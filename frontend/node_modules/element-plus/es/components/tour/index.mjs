import _sfc_main$1 from './src/tour.vue2.mjs';
import _sfc_main from './src/step.vue2.mjs';
export { tourEmits, tourProps } from './src/tour.mjs';
export { tourStepEmits, tourStepProps } from './src/step.mjs';
export { tourContentEmits, tourContentProps, tourPlacements, tourStrategies } from './src/content.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElTour = withInstall(_sfc_main$1, {
  TourStep: _sfc_main
});
const ElTourStep = withNoopInstall(_sfc_main);

export { ElTour, ElTourStep, ElTour as default };
//# sourceMappingURL=index.mjs.map
