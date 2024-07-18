function CategorySelector({ categories, activeCategory, onCategoryChange }) {
  return (
    <div
      className={`inline-flex py-3 md:rounded-md border-b bg-slate-100/80 backdrop-blur-md text-slate-800 border-white/20 z-50 px-2 dark:bg-slate-800 dark:text-slate-400 fixed mx-auto container lg:justify-center w-full max-w-7xl -translate-x-1/2 left-1/2 overflow-x-auto whitespace-nowrap items-center`}
    >
      {categories.map((category) => (
        <button
          onClick={() => onCategoryChange(category)}
          className={`inline-flex flex-col items-center justify-center whitespace-nowrap mx-4 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50 rounded-md h-full ${
            activeCategory === category
              ? "text-red-600 text-[19px] font-extrabold"
              : ""
          }`}
          key={category}
          value={category}
        >
          <div className="mx-4 relative w-16 h-16">
            <img
              className={`w-full h-full rounded-full ${
                activeCategory === category
                  ? "outline outline-1 outline-red-500 outline-offset-2"
                  : ""
              }`}
              src="../images/baklawa.webp"
              alt=""
            />
          </div>
          <span className="mt-2">{category}</span>
        </button>
      ))}
    </div>
  );
}

export default CategorySelector;
