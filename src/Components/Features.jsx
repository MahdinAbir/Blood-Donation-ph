import { motion } from "framer-motion";
import { BookOpen, Brain, MessageSquare, BarChart2, Headphones, Users } from "lucide-react";

const features = [
  {
    title: "AI Essay Evaluation",
    description: "Get instant band-score predictions and feedback on your essays powered by AI.",
    icon: Brain,
  },
  {
    title: "AI Speaking Partner",
    description: "Practice speaking with an AI partner that gives real-time feedback on fluency and pronunciation.",
    icon: MessageSquare,
  },
  {
    title: "Full-Length Mock Tests",
    description: "Access authentic IELTS-style mock tests with detailed band analysis.",
    icon: BookOpen,
  },
  {
    title: "Personalized Study Plan",
    description: "Receive tailored study schedules based on your current level and exam date.",
    icon: BarChart2,
  },
  {
    title: "Listening Practice Hub",
    description: "Practice listening with real IELTS audios and track progress automatically.",
    icon: Headphones,
  },
  {
    title: "Community & Live Classes",
    description: "Join live classes, group discussions, and connect with IELTS aspirants worldwide.",
    icon: Users,
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-[#f5edd6]" id="features">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Powerful Features of IELTS Nerds
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-[#c0dde4] p-8 rounded-2xl shadow-md hover:shadow-xl animate-shadowLoop text-center"
            >
              <feature.icon className="w-16 h-16 mx-auto text-indigo-600 mb-6" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-black">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
