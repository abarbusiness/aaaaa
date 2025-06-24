import React from "react";

const features = [
  {
    icon: "📚",
    title: "Quality Study Material",
    description: "Access expertly curated notes, sample papers, and resources for every subject and class."
  },
  {
    icon: "🧑‍💻",
    title: "Interactive Learning",
    description: "Enjoy quizzes, live sessions, and practice tests that make learning engaging and effective."
  },
  {
    icon: "🤝",
    title: "Personalized Support",
    description: "Get guidance from experienced educators and receive feedback tailored to your learning needs."
  }
];

const StandoutSection = () => {
  return (
    <section className="bg-[#f6f6f6] py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-12">
          What makes <span className="text-[#ff422b]">Vardaan Learning Institute</span> Stand Out
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex-1 bg-gradient-to-br from-[#fff7ed] via-[#fffbe5] to-[#fef3c7] p-1 rounded-[22px] min-w-[260px] max-w-[340px] min-h-[270px] transition-transform duration-300 hover:scale-[1.035] group"
            >
              <div className="bg-white border-l-8 border-[#ea580c] rounded-[18px] shadow-[0_8px_32px_0_rgba(234,88,12,0.13)] p-8 flex flex-col items-start text-left h-full w-full">
                <div className="text-6xl mb-6 text-[#ea580c] group-hover:text-[#fb923c] transition-colors duration-300">{feature.icon}</div>
                <h3 className="text-2xl font-extrabold text-[#ea580c] mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-[#18181b] text-base leading-relaxed max-w-xs">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StandoutSection;
