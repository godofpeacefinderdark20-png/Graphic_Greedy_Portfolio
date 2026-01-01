export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <section className="mb-32">
            <h1 className="text-6xl md:text-8xl font-extralight tracking-tight mb-8">
              About
            </h1>
            <div className="h-px w-32 bg-gradient-to-r from-white to-transparent mb-16" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/90 mb-8">
                  Graphic Greedy is where visual excellence meets
                  conversion-focused strategy.
                </p>
                <p className="text-lg text-white/70 leading-relaxed">
                  We create brands that look premium, communicate clearly,
                  and perform commercially. Our work bridges the gap between
                  stunning aesthetics and measurable business results.
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
                <div className="relative bg-white/5 rounded-3xl p-12 border border-white/10">
                  <h3 className="text-2xl font-light mb-6">Our Philosophy</h3>
                  <p className="text-white/70 leading-relaxed mb-4">
                    Every design decision is strategic. Every visual element
                    serves a purpose. We don't just make things beautiful—we
                    make beautiful things that work.
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    Our designs are built to convert, engage, and scale.
                    Performance isn't an afterthought; it's embedded in every
                    pixel, every color choice, every typographic decision.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-32">
            <h2 className="text-4xl font-light mb-12">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Brand Identity Systems',
                  description:
                    'Complete visual systems that define who you are, what you stand for, and how you communicate. From logo design to brand guidelines, we create cohesive identities that resonate.',
                },
                {
                  title: 'Performance Marketing Design',
                  description:
                    'Designs engineered for conversion. We combine aesthetic excellence with data-driven insights to create marketing materials that not only look premium but drive measurable results.',
                },
                {
                  title: 'Visual Communication',
                  description:
                    'Posters, campaigns, and designs that capture attention in a crowded market. Every piece is crafted to communicate your message clearly and memorably.',
                },
                {
                  title: 'Motion & Video Content',
                  description:
                    'Cinematic storytelling that brings brands to life. From promotional videos to motion graphics, we create dynamic content that engages and converts.',
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-500"
                >
                  <h3 className="text-xl font-medium mb-4 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-32">
            <h2 className="text-4xl font-light mb-12">Our Approach</h2>
            <div className="space-y-12">
              {[
                {
                  number: '01',
                  title: 'Strategy First',
                  description:
                    'Before any design begins, we dive deep into understanding your brand, audience, and goals. Strategic thinking informs every creative decision.',
                },
                {
                  number: '02',
                  title: 'Design Excellence',
                  description:
                    'We obsess over details. Typography, color, composition—every element is carefully considered to create visually stunning work that stands out.',
                },
                {
                  number: '03',
                  title: 'Performance Focus',
                  description:
                    'Beautiful designs mean nothing without results. We build in conversion optimization, ensuring your visuals drive real business outcomes.',
                },
                {
                  number: '04',
                  title: 'Continuous Evolution',
                  description:
                    'Brands evolve, and so should their visuals. We create systems that grow with you, maintaining consistency while adapting to new challenges.',
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="flex gap-8 items-start group hover:translate-x-2 transition-transform duration-500"
                >
                  <div className="text-6xl font-extralight text-white/20 group-hover:text-white/40 transition-colors">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-light mb-3">{step.title}</h3>
                    <p className="text-white/60 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center">
            <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-16 border border-white/10">
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                Let's Create Something Exceptional
              </h2>
              <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
                Ready to elevate your brand with design that performs?
                Let's start a conversation.
              </p>
              <button className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all hover:scale-105">
                Get In Touch
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
