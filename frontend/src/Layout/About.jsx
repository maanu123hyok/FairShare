const About = () => {
    return (
      <section id="about" className="w-full bg-[#f9f3ea]/30 py-20 px-6 font-lato scroll-mt-16">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Section Tag */}
          <span className="text-[#988B7B] font-bold text-xs uppercase tracking-widest mb-3">
            Who We Are
          </span>
          
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-asul font-bold text-center text-slate-800 tracking-wide mb-6">
            About FairShare
          </h2>
          
          {/* Accent Bar */}
          <div className="w-16 h-1 bg-[#988B7B] rounded mb-10"></div>
  
          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm">
              <p>
                We believe that sharing experiences with friends, family, and roommates shouldn't come with the awkwardness of talking about money. Whether it’s splitting rent, sharing vacation bills, or putting dinner on one card, we’ve got you covered.
              </p>
              <p>
                Our application is designed around simplicity, transparency, and fairness. No complicated spreadsheets or forgotten debts—just clean, modern tracking to keep everyone on the same page.
              </p>
            </div>
  
            {/* Pillars List */}
            <div className="flex flex-col gap-4">
              <div className="bg-white p-4 rounded-xl border border-[#BCB3B1]/30 shadow-sm flex gap-3">
                <span className="text-[#988B7B] font-bold">01.</span>
                <div>
                  <h4 className="font-asul font-bold text-slate-800 text-sm">Real-time Splits</h4>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Track transactions instantly with group members.</p>
                </div>
              </div>
  
              <div className="bg-white p-4 rounded-xl border border-[#BCB3B1]/30 shadow-sm flex gap-3">
                <span className="text-[#988B7B] font-bold">02.</span>
                <div>
                  <h4 className="font-asul font-bold text-slate-800 text-sm">Minimalist Interface</h4>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Zero clutter. Focus entirely on clear expense records.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default About;