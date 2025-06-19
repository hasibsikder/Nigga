import { Award, Truck, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Every product is carefully selected and tested to ensure it meets our high standards for quality and durability."
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "We offer quick and reliable shipping options to get your products to you as soon as possible."
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our dedicated customer support team is always ready to help you with any questions or concerns."
  }
];

const FeatureCard = ({ icon: Icon, title, description, index }: { 
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  index: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start space-x-4">
        <div className="glass w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon className="text-indigo-600 w-6 h-6" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section 
      id="about" 
      className="py-20 relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          initial={{ x: -50, y: -50 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-10 left-10 w-32 h-32 glass rounded-full"
        />
        <motion.div
          initial={{ x: 50, y: 50 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', delay: 2 }}
          className="absolute bottom-10 right-10 w-24 h-24 glass rounded-full"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            id="about-heading"
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            About Hasib's Shop
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're passionate about bringing you the finest products with cutting-edge design and exceptional quality
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="glass-strong rounded-3xl p-8 hover:shadow-xl transition-shadow"
          >
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern office workspace with design elements" 
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
              loading="lazy"
            />
          </motion.div>
          
          <div className="space-y-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
