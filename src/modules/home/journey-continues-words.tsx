import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function JourneyContinuesWords() {
  let [index, setIndex] = useState(0);
  let words = ["Progresses", "Continues", "Resumes", "Presists", "Advances"];
  let word = words[index];

  let separate = {
    hidden: { opacity: 0, y: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      y: custom * 5,
      transition: { duration: 0.2 },
    }),
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words]);

  return (
    <section className="w-11/12 mx-auto max-w-5xl pb-6 lg:pb-14 overflow-x-hidden relative">
      <div className="border-r border-neutral-700 h-20 w-1/2 my-4"></div>

      <h2 className="text-4xl font-bold 2xl:text-5xl text-center text-balance px-4">
        <motion.div
          custom={-1}
          variants={separate}
          initial="hidden"
          animate="visible"
        >
          The Story
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            key={word}
            custom={1}
            variants={separate}
            initial="hidden"
            animate="visible"
            exit={{
              y: 10,
              opacity: 0,
            }}
          >
            {word}
          </motion.div>
        </AnimatePresence>
      </h2>
    </section>
  );
}
