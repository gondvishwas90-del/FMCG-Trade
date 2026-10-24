import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface BreadcrumbsProps {
    items: { id: string; name: string }[];
    onNavigate: (index: number) => void;
    onHome: () => void;
}

export const Breadcrumbs = ({ items, onNavigate, onHome }: BreadcrumbsProps) => {
    return (
        <nav className="flex items-center space-x-2 text-sm text-neutral-400 mb-6">
            <button
                onClick={onHome}
                className="hover:text-white transition-colors flex items-center gap-1"
            >
                <Home size={14} />
                <span className="hidden sm:inline">All</span>
            </button>

            {items.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-2"
                >
                    <ChevronRight size={14} className="text-neutral-600" />
                    <button
                        onClick={() => onNavigate(index)}
                        className={`hover:text-white transition-colors ${index === items.length - 1 ? 'text-white font-medium' : ''
                            }`}
                    >
                        {item.name}
                    </button>
                </motion.div>
            ))}
        </nav>
    );
};
