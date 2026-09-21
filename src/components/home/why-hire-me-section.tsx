import { Link } from "@tanstack/react-router";
import { media } from "@/data/media";

export function WhyHireMeSection() {
  return (
    <section className="container-page py-10 sm:py-16">
      <div className="relative rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-[#F5F6F8] border border-gray-200/70 p-7 sm:p-10 md:p-14 overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-14">
          
          {/* Left Column: Portrait with refined soft blue arch shape */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[260px] sm:w-[300px] md:w-[340px] h-[320px] sm:h-[370px] md:h-[400px] flex items-end justify-center">
              {/* Soft Periwinkle Arch Shape */}
              <div className="absolute inset-x-4 bottom-0 top-10 rounded-t-[130px] sm:rounded-t-[160px] bg-gradient-to-b from-[#DFE8FA] to-[#C9D9FB] shadow-inner border border-white/60" />
              
              {/* Image */}
              <div className="relative z-10 w-full h-full flex items-end justify-center overflow-hidden rounded-b-2xl">
                <img
                  src={media.portraitPhoto}
                  alt="Azeem Olunloye"
                  className="h-[94%] w-auto object-cover object-top drop-shadow-xl"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Heading, Paragraph, Metrics, CTA */}
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#101828]">
              Why <span className="text-[#5B8CFF]">Hire me</span>?
            </h2>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#667085] max-w-xl">
              I turn manual operations into systems that run themselves. Built to hold up as volume grows,
              with queues, retries and sensible rate limits. Every automation is judged on hours saved,
              cost removed and revenue protected — leaving your team free to focus on high-leverage growth.
            </p>

            {/* Statistics Row */}
            <div className="mt-8 grid grid-cols-2 gap-6 max-w-md">
              <div>
                <p className="font-display text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight">
                  15+
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#667085] mt-1">
                  Workflows in Production
                </p>
              </div>

              <div>
                <p className="font-display text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight">
                  20+
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#667085] mt-1">
                  Tools Integrated
                </p>
              </div>
            </div>

            {/* Outlined Pill CTA */}
            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#5B8CFF] px-7 py-3 text-sm font-bold text-[#5B8CFF] transition-all duration-300 hover:bg-[#5B8CFF] hover:text-white hover:scale-105"
              >
                Hire me
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
