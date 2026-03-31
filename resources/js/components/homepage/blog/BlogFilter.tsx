import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ListFilter, Search } from 'lucide-react';
import React from 'react';

interface Category {
  id: number;
  name: string;
}

interface BlogFilterProps {
  categories: Category[];
  currentSearch: string;
  currentCategoryId: number | '';
  initialPerPage?: number;
  setCurrentSearch: React.Dispatch<React.SetStateAction<string>>;
  setCurrentCategoryId: React.Dispatch<React.SetStateAction<number | ''>>;
}

const fadeInSlideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

declare global {
  interface Window {
    _searchTimeout?: ReturnType<typeof setTimeout>;
  }
}

const BlogFilter: React.FC<BlogFilterProps> = ({
  categories,
  currentSearch,
  currentCategoryId,
  initialPerPage = 6,
  setCurrentSearch,
  setCurrentCategoryId,
}) => {
  const applyFilters = (
    page: number = 1,
    newSearch: string = currentSearch,
    newCategoryId: number | '' = currentCategoryId,
  ) => {
    const queryParams: {
      page: number;
      per_page: number;
      search?: string;
      category_id?: number;
    } = {
      page,
      per_page: initialPerPage,
    };

    if (newSearch) queryParams.search = newSearch;
    if (newCategoryId) queryParams.category_id = newCategoryId;

    router.get(route('blog.index'), queryParams, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setCurrentSearch(newSearch);
    if (window._searchTimeout) clearTimeout(window._searchTimeout);

    window._searchTimeout = setTimeout(() => {
      applyFilters(1, newSearch, currentCategoryId);
    }, 300);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategoryId = e.target.value === '' ? '' : parseInt(e.target.value, 10);
    setCurrentCategoryId(newCategoryId);
    applyFilters(1, currentSearch, newCategoryId);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInSlideUp}
      className="mb-14 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md p-6 shadow-md transition-all duration-300"
    >
      {/* Search */}
      <div className="relative w-full md:w-1/2">
        <input
          type="text"
          placeholder="Cari artikel berdasarkan judul atau ringkasan..."
          value={currentSearch}
          onChange={handleSearchChange}
          className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-12 text-gray-900 placeholder-gray-400 shadow-sm 
                     focus:border-purple-400 focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all duration-200"
        />
        <Search className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-purple-400" />
      </div>

      {/* Dropdown kategori */}
      <div className="relative w-full md:w-1/3">
        <select
          value={currentCategoryId}
          onChange={handleCategoryChange}
          className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-12 text-gray-900 shadow-sm 
                     focus:border-purple-400 focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all duration-200"
        >
          <option value="">Semua Kategori</option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
              className="bg-white text-gray-900 hover:bg-purple-100"
            >
              {category.name}
            </option>
          ))}
        </select>
        <ListFilter className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-purple-400" />
      </div>
    </motion.div>
  );
};

export default BlogFilter;
