import { motion } from 'framer-motion';
import Image from 'next/image';

interface ExplorerItem extends Record<string, any> {
    id: string;
    name: string;
    image: string;
    mobileImage?: string;
    mobileBackgroundImage?: string;
    description?: string;
}

interface ExplorerViewProps<T extends ExplorerItem> {
    items: T[];
    onSelect: (item: T) => void;
    onHover?: (item: T | null) => void;
    title: string;
    description: string;
}

export const ExplorerView = <T extends ExplorerItem>({
    items,
    onSelect,
    onHover,
    title,
    description
}: ExplorerViewProps<T>) => {

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemAnim = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50 mb-4 tracking-tight">
                    {title}
                </h1>
                <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-light">
                    {description}
                </p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        variants={itemAnim}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        onClick={() => onSelect(item)}
                        onMouseEnter={() => onHover && onHover(item)}
                        onMouseLeave={() => onHover && onHover(null)}
                        className="group cursor-pointer relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 bg-neutral-900/40 backdrop-blur-sm hover:border-white/20 transition-colors shadow-2xl"
                    >
                        {/* Image Background */}
                        <div className="absolute inset-0 w-full h-full">
                            <Image
                                src={item.mobileImage || item.image}
                                alt={item.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                            <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                                {item.name}
                            </h3>
                            {item.description && (
                                <p className="text-sm text-neutral-300 line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                    {item.description}
                                </p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};
