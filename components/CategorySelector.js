function CategorySelector({ categories, activeCategory, onCategoryChange }) {
  return (
    // <div className="fixed flex max-w-full  space-x-4 z-50 rounded-md bg-slate-100 px-4 py-2 text-slate-500 just w-full overflow-x-scroll">
    //   {categories.map((category) => (
    //     <button
    //       key={category}
    //       value={category}
    //       onClick={() => onCategoryChange(category)}
    //       className={`p-2 ring-offset-red-500
    //       ${
    //         activeCategory === category
    //           ? "text-red-500 font-medium"
    //           : "text-gray-500"
    //       }`}
    //     >
    //       {category}
    //     </button>
    //   ))}
    // </div>
    <div class="rounded-md relative border-b border-gray-200  sm:overflow-hidden bg-blue-500 mx-auto max-w-full grid grid-cols-1 gap-4 lg:col-span-3 ">
      <nav
        class=" flex space-x-8 bg-white overflow-x-auto scroll-"
        aria-label="Tabs"
      >
        {categories.map((category) => (
          <button
            key={category}
            value={category}
            onClick={() => onCategoryChange(category)}
            className={`p-2 ring-offset-red-500
           ${
             activeCategory === category
               ? "text-red-500 font-medium"
               : "text-gray-500"
           }`}
          >
            {category}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default CategorySelector;
