
import axios from 'axios';
import Notiflix from 'notiflix';

export async function fetchImages(query, currentPage, perPage, lightbox, gallery, loadMoreButton) {
  const API_URL = 'https://pixabay.com/api/';
  const API_KEY = '40576419-28b6c5efeaf1f3d7724b485b7';

  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        page: currentPage,
        per_page: perPage,
      },
    });

    const data = response.data;

    if (data.hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
      displayImages(data.hits, gallery, currentPage, perPage, loadMoreButton);
      lightbox.refresh();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

export function displayImages(images, gallery, currentPage, perPage, loadMoreButton) {
  if (currentPage === 1) {
    gallery.innerHTML = '';
  }

  images.forEach(image => {
    const card = createImageCard(image);
    gallery.appendChild(card);
  });

  if (images.length < perPage) {
    loadMoreButton.style.display = 'none';
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  } else {
    loadMoreButton.style.display = 'block';
  }
}

export function createImageCard(image) {
  const card = document.createElement('div');
  card.className = 'photo-card';

  const link = document.createElement('a');
  link.href = image.largeImageURL;

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;

  const info = document.createElement('div');
  info.className = 'info';

  const likes = document.createElement('p');
  likes.className = 'info-item';
  likes.innerHTML = `<b>Likes:</b> ${image.likes}`;

  const views = document.createElement('p');
  views.className = 'info-item';
  views.innerHTML = `<b>Views:</b> ${image.views}`;

  const comments = document.createElement('p');
  comments.className = 'info-item';
  comments.innerHTML = `<b>Comments:</b> ${image.comments}`;

  const downloads = document.createElement('p');
  downloads.className = 'info-item';
  downloads.innerHTML = `<b>Downloads:</b> ${image.downloads}`;

  info.appendChild(likes);
  info.appendChild(views);
  info.appendChild(comments);
  info.appendChild(downloads);

  link.appendChild(img);
  card.appendChild(link);
  card.appendChild(info);

  return card;
}
