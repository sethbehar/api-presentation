import { lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSlideNavigation } from './hooks/useSlideNavigation';
import SlideNav from './components/SlideNav';

const slideImports = [
  lazy(() => import('./slides/01_Title')),
  lazy(() => import('./slides/02_WhatIsApi')),
  lazy(() => import('./slides/03_TypesOverview')),
  lazy(() => import('./slides/04_RestDeepDive')),
  lazy(() => import('./slides/07_ArchOverview')),
  lazy(() => import('./slides/08_ApiGateway')),
  lazy(() => import('./slides/09_BackendServices')),
  lazy(() => import('./slides/10_SecurityAuth')),
  lazy(() => import('./slides/11_PerfOverview')),
  lazy(() => import('./slides/12_RateLimiting')),
  lazy(() => import('./slides/13_Caching')),
  lazy(() => import('./slides/14_Compression')),
  lazy(() => import('./slides/15_DatabaseQueries')),
  lazy(() => import('./slides/16_Pagination')),
  lazy(() => import('./slides/17_AzureApim')),
  lazy(() => import('./slides/18_Summary')),
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export default function App() {
  const { currentSlide, direction, next, prev, goTo } = useSlideNavigation(slideImports.length);
  const ActiveSlide = slideImports[currentSlide];

  return (
    <div className="relative h-full w-full bg-slate-950 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      {/* Slide container */}
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                </div>
              }
            >
              <ActiveSlide isActive={true} />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Restart + timer */}
      <SlideNav onRestart={() => goTo(0)} />
    </div>
  );
}
