// load more button ---
  const featuredContainer = document.getElementById('featured-posts-container');
  const regularContainer = document.getElementById('regular-posts-container');
  const templateContainer = document.getElementById('all-posts-template');
  const loadMoreBtn = document.getElementById('load-more');

  // Get references to all card wrapper elements *from the hidden template*
  const allCardElements = templateContainer ? Array.from(templateContainer.querySelectorAll('.card-wrapper')) : [];

  // --- State Variables ---
  let currentVisibleElements = []; // Holds references to elements matching current filter/sort, in order
  const batchSize = 5; // How many items to load at once
  let currentIndex = 0; // Start index for loading more

  const loadMore = () => {
    if (!featuredContainer || !regularContainer) return;

    // Determine the next batch of card *elements* to show from the filtered/sorted list
    const nextBatch = currentVisibleElements.slice(currentIndex, currentIndex + batchSize);
    // Calculate count based on elements currently *in the visible containers*
    const currentlyDisplayedCount = featuredContainer.children.length + regularContainer.children.length;

    nextBatch.forEach((el, index) => {
      el.classList.remove('hidden'); // Make the element visible

      // Decide where to append based on the overall position in the filtered list
      const overallIndex = currentlyDisplayedCount + index; 
      if (overallIndex < 2) { // First two go into the featured container
        featuredContainer.appendChild(el);
      } else { // Others go into the regular container
        regularContainer.appendChild(el);
      }
    });

    currentIndex += nextBatch.length;

    // Update button visibility
    if (currentIndex >= currentVisibleElements.length) {
      loadMoreBtn.style.display = 'none'; 
    } else {
      loadMoreBtn.style.display = 'inline-flex';
    }
  };