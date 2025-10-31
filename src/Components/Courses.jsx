import { motion } from "framer-motion";
import { CheckCircle, Sparkles, Clock } from "lucide-react";

const courses = [
  {
    title: "IELTS MODULE MASTERS",
    cover: "https://images.unsplash.com/photo-1584697964154-ef8f9f9d1db5", // replace with your own
    points: [
      "Separate modules: Reading, Writing, Listening, Speaking",
      "Dedicated Support",
      "Interactive Classes & Quizzes",
      "Practice Exams & Mock Tests",
      "Cheat Sheets & Tips",
    ],
    icon: CheckCircle,
  },
  {
    title: "All in One Whole IELTS Package",
    cover: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238",
    points: [
      "Premium Package Access",
      "24/7 Support",
      "1-on-1 Mentorship",
      "Live Interactive Classes",
      "All Quizzes & Exams Included",
      "Special Extra Benefits",
    ],
    icon: Sparkles,
  },
  {
    title: "Abir Bhaiya Mair Deya Course",
    cover: "https://images.unsplash.com/photo-1616627454326-6e79f8c9a3c0",
    points: [
      "Sudhu Moja Ar Moja",
      "Chill Korbo",
      "Pora Hobe Na",
      "Web Development Shikhabo",
      "(COMING SOON 🚀)",
    ],
    icon: Clock,
  },
];

export default function Courses() {
  return (
    <section className="py-20 bg-white" id="courses">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Available Courses
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-gray-50 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Cover Image */}
              <div className="h-56 w-full overflow-hidden">
                <img
                  src={course.cover}
                  alt={course.title}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>

              {/* Text & Features */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-center mb-4">
                  <course.icon className="w-10 h-10 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-semibold text-center mb-6">
                  {course.title}
                </h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  {course.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
                
              </div>
             
            </motion.div>
            
          ))}
        </div>
        
      </div>
    </section>
  );
}
