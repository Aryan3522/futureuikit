import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const ComponentsGrid = ({ items }) => {
    if (!items || items.length === 0) return null;

    const sortedItems = [...items].sort((a, b) => 
        a.title.localeCompare(b.title)
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 w-full">
            {sortedItems.map((item, idx) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.02 }}
                >
                    <Link 
                        href={`/components/${item.type.toLowerCase()}/${item.slug}/${item.id}`}
                        className="font-label group flex items-center gap-1.5 text-sm text-foreground/80 hover:text-primary transition-colors whitespace-nowrap overflow-hidden w-fit"
                    >
                        <span className="text-ellipsis overflow-hidden">
                            {item.title}
                        </span>
                        <ArrowUpRight size={14} className="flex-shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </Link>
                </motion.div>
            ))}
        </div>
    );
};

export default ComponentsGrid;
