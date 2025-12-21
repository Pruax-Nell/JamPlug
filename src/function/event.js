const categoryFilter = document.getElementById('Category');
  const sortFilter = document.getElementById('Relevance');
  const featuredContainer = document.getElementById('featured-posts-container');
  const regularContainer = document.getElementById('regular-posts-container');
  const templateContainer = document.getElementById('all-posts-template');
  const loadMoreBtn = document.getElementById('load-more');

  const applyFiltersAndSort = () => {
    const selectedCategory = categoryFilter.value;
    const sortBy = sortFilter.value;

    // Start with all elements
    let filtered = [...allCardElements];

    // Filter: Category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((el) => {
        const categories = el.firstElementChild?.dataset.categories || '';
        // Check if the comma-separated list includes the selected category
        return categories.split(',').map(c => c.trim()).includes(selectedCategory);
      });
    }
    // No 'else' needed, if 'All' is selected, we keep all elements from the previous step.

    // Sort: Newest or Oldest
    filtered.sort((a, b) => {
      // Use Date objects for comparison
      const aDate = new Date(a.firstElementChild?.dataset.date || 0).getTime();
      const bDate = new Date(b.firstElementChild?.dataset.date || 0).getTime();
      return sortBy === 'Newest first' ? bDate - aDate : aDate - bDate;
    });

    // Update the list of elements that should be visible, in the correct order
    currentVisibleElements = filtered;

    // --- Important: Clear BOTH visible containers before loading the first batch ---
    // Ensure containers exist before clearing
    if (featuredContainer) featuredContainer.innerHTML = ''; 
    if (regularContainer) regularContainer.innerHTML = '';

    // Reset the index and load the first batch using the updated loadMore logic
    currentIndex = 0;
    loadMore();
  };

  // --- Initial Setup ---
  // Cards are rendered hidden in the template container, no JS hiding needed here.
  // Ensure template container itself remains hidden (done via CSS/template class)

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMore);
  }
  if (categoryFilter) {
    categoryFilter.addEventListener('change', applyFiltersAndSort);
  }
  if (sortFilter) {
    sortFilter.addEventListener('change', applyFiltersAndSort);
  }

  // Apply initial filters/sort only if necessary elements exist
  if (categoryFilter && sortFilter && featuredContainer && regularContainer && templateContainer) {
    applyFiltersAndSort();
  } else {
    console.error("Community page script: Could not find all required elements for filtering/sorting.");
    // Optionally hide the load more button if setup fails
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
  }