import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { FadeIn } from '../common/FadeIn';

const AUDIENCES = [
  {
    t: 'Students',
    d: "Turn what you've learned into proof employers can check — before your first role.",
    img: 'https://media.base44.com/images/public/6ab7bee77689dc7dd13fa52e/f8b00967d_generated_image.png',
    cls: 'lg:col-span-5 lg:row-span-2 min-h-[380px] lg:min-h-[520px]',
  },
  {
    t: 'Working professionals',
    d: 'Certify the skills you use every day, without pausing work for a course.',
    img: 'https://media.base44.com/images/public/6ab7bee77689dc7dd13fa52e/e06b00256_generated_image.png',
    cls: 'lg:col-span-7 min-h-[250px]',
  },
  {
    t: 'Career switchers',
    d: "Show a new field you're ready — with evidence, not just intent.",
    img: 'https://media.base44.com/images/public/6ab7bee77689dc7dd13fa52e/6b21b29b5_generated_image.png',
    cls: 'lg:col-span-4 min-h-[250px]',
  },
  {
    t: 'Self-taught professionals',
    d: 'No degree in it? Get assessed on what you can actually do.',
    img: 'https://media.base44.com/images/public/6ab7bee77689dc7dd13fa52e/4ea72bdf1_generated_image.png',
    cls: 'lg:col-span-3 min-h-[250px]',
  },
];

export const AudienceCards: React.FC = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Who it's for"
          title="For people who already do the work."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
          {AUDIENCES.map((item, idx) => (
            <FadeIn
              key={item.t}
              delay={idx * 0.08}
              className={`group relative overflow-hidden rounded-[26px] border border-border min-h-[300px] ${item.cls}`}
            >
              <img
                src={item.img}
                alt={item.t}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-2xl font-semibold tracking-tight text-white">
                  {item.t}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80">
                  {item.d}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
