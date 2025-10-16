"use client";
import { motion } from "framer-motion";
import Link from "next/link";

interface DesignSelectorProps {
  currentDesignId?: number;
}

export function DesignSelector({ currentDesignId }: DesignSelectorProps) {
  const designs = [
    { id: 1, name: "디자인 1", description: "내면의 빛을 따라", gradient: "from-violet-600 via-purple-600 to-fuchsia-600" },
    { id: 2, name: "디자인 2", description: "무한한 가능성", gradient: "from-emerald-500 via-teal-500 to-cyan-500" },
    { id: 3, name: "디자인 3", description: "성장의 시간", gradient: "from-rose-500 via-pink-500 to-fuchsia-500" },
    { id: 4, name: "디자인 4", description: "진정한 나의 발견", gradient: "from-blue-600 via-indigo-600 to-purple-600" },
    { id: 5, name: "디자인 5", description: "변화와 가능성", gradient: "from-amber-500 via-orange-500 to-rose-500" },
    { id: 6, name: "디자인 6", description: "회복의 길", gradient: "from-sky-500 via-blue-500 to-indigo-500" },
  ];

  return (
    <section className="relative z-10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design, idx) => {
            const isCurrentDesign = design.id === currentDesignId;
            
            return (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  href={`/design/${design.id}`}
                  className="block"
                >
                  <motion.div
                    className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 bg-gradient-to-br ${design.gradient} ${
                      isCurrentDesign 
                        ? 'border-white/40 ring-2 ring-white/30 shadow-lg shadow-white/20' 
                        : 'border-white/20 hover:border-white/40 hover:shadow-lg'
                    }`}
                    whileHover={{ scale: 1.03, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* 현재 디자인 배지 */}
                    {isCurrentDesign && (
                      <div className="absolute top-3 right-3 z-20 bg-purple-500 text-white text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          fontFamily: 'GMarketSans, sans-serif',
                        }}
                      >
                        현재
                      </div>
                    )}

                    {/* 컨텐츠 */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[140px] p-6">
                      <motion.div
                        className="text-4xl font-bold text-white mb-2"
                        style={{
                          fontFamily: 'GMarketSans, sans-serif',
                        }}
                      >
                        {design.id}
                      </motion.div>
                      <h3
                        className="text-lg font-bold text-white mb-1.5"
                        style={{
                          fontFamily: 'GMarketSans, sans-serif',
                          fontWeight: 700,
                        }}
                      >
                        {design.name}
                      </h3>
                      <p
                        className="text-gray-300 text-xs text-center"
                        style={{
                          fontFamily: 'GMarketSans, sans-serif',
                          fontWeight: 400,
                        }}
                      >
                        {design.description}
                      </p>
                    </div>
                    
                    {/* Hover 효과 */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{ pointerEvents: 'none' }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

