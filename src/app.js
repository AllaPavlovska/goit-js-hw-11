
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { fetchImages } from './gallery';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form');
  const gallery = document.getElementById('gallery');
  const loadMoreButton = document.querySelector('.load-more');
  let currentPage = 1;
  const perPage = 40;
  const lightbox = new SimpleLightbox('.gallery a');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const searchQuery = form.searchQuery.value;
    currentPage = 1;
    fetchImages(searchQuery, currentPage, perPage, lightbox, gallery, loadMoreButton);
  });

  loadMoreButton.addEventListener('click', function () {
    const searchQuery = form.searchQuery.value;
    fetchImages(searchQuery, currentPage, perPage, lightbox, gallery, loadMoreButton);
    currentPage++;
  });
});



