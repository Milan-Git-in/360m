export default function Footer() {
  return (
    <footer
      id="site-footer"
      role="contentinfo"
      className="w-full py-24 px-6 md:px-20 bg-primary text-surface-variant border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="max-w-sm">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center text-primary font-bold text-xl">
              360
            </div>
            <div className="font-headline-lg text-secondary-fixed text-3xl tracking-tight">
              EVENTS
            </div>
          </div>
          <p className="font-body-md opacity-70 leading-loose">
            Pioneering the future of heritage-driven hospitality and large-scale
            event excellence since 2022.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-24">
          <nav aria-label="Footer navigation">
            <h4 className="font-label-md text-secondary-fixed tracking-[0.2em] text-xs mb-8">
              Navigation
            </h4>
            <div className="flex flex-col gap-4 font-body-md">
              <a
                className="hover:text-secondary-fixed transition-colors opacity-80 hover:opacity-100"
                href="#legacy"
              >
                About Our Legacy
              </a>
              <a
                className="hover:text-secondary-fixed transition-colors opacity-80 hover:opacity-100"
                href="#partners"
              >
                Current Portfolio
              </a>
              <a
                className="hover:text-secondary-fixed transition-colors opacity-80 hover:opacity-100"
                href="#contact"
              >
                Careers
              </a>
            </div>
          </nav>
          <div>
            <h4 className="font-label-md text-secondary-fixed tracking-[0.2em] text-xs mb-8">
              Governance
            </h4>
            <div className="flex flex-col gap-4 font-body-md">
              <a
                className="hover:text-secondary-fixed transition-colors opacity-80 hover:opacity-100"
                href="#"
              >
                Terms of Access
              </a>
              <a
                className="hover:text-secondary-fixed transition-colors opacity-80 hover:opacity-100"
                href="#"
              >
                Privacy Charter
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm opacity-40">
          &copy; {new Date().getFullYear()} 360 EVENTS. All Rights Reserved.
        </p>
        <div className="flex gap-8 opacity-40">
          <span className="text-xs uppercase tracking-widest font-label-md">
            Ahmedabad
          </span>
         
        </div>
      </div>
    </footer>
  );
}
