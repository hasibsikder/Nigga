// Using cn for class names
<div className={cn("p-4", isActive && "bg-blue-500")}>

// Formatting dates
<p>{formatDate(new Date())}</p>

// Debouncing search input
const debouncedSearch = debounce((query) => {
  searchAPI(query);
}, 300);

<input onChange={(e) => debouncedSearch(e.target.value)} />

// Truncating long text
<p>{truncate(longDescription, 100)}</p>

// Generating unique IDs
<label htmlFor={generateId("email")}>Email</label>
