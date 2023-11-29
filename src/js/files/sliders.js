/*
Документація по роботі у шаблоні:
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Pagination, EffectFade, Autoplay, Thumbs, Navigation } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay,
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.sd1234342')) {
			new Swiper('.sd12324234', {
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			//autoHeight: true,
			speed: 800,

			// lazyPreloaderClass: 'preloader',

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагінація
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},
			/*
			// Брейкпоінти
			breakpoints: {
				640: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// Події
			on: {

			}
		});
	}

	if (document.querySelector('.hero__slider')) {
		new Swiper('.hero__slider', {
		modules: [Pagination, EffectFade, Autoplay],
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 0,
		speed: 800,

		lazyPreloaderClass: 'preloader',

		effect: 'fade',
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},

		pagination: {
			el: '.hero__slider .pagination',
			clickable: true,
		},



	});

	if (document.querySelector('.products__slider')) {
		let productsSlider = new Swiper('.products__slider', {
			modules: [Pagination, Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 4,
			spaceBetween: 20,
			speed: 800,
			lazyPreloaderClass: 'preloader',
			slideToClickedSlide: true,
			navigation: {
				prevEl: '.products__navigation .button-prev',
				nextEl: '.products__navigation .button-next',
			},
			breakpoints: {
				320: {
					slidesPerView: 1.3,
					spaceBetween: 15,
				},
				500: {
					slidesPerView: 1.5,
					spaceBetween: 15,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1210: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
			},
		});
		new Swiper('.products__slider-big', {
			modules: [Pagination, Thumbs],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 20,
			speed: 800,
			autoHeight: true,
			lazyPreloaderClass: 'preloader',

			thumbs: {
				swiper: productsSlider,
			},
		})
	}
	if (document.querySelector('.reviews__slider')) {
		new Swiper('.reviews__slider', {
			modules: [Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 4,
			spaceBetween: 20,
			speed: 800,
			lazyPreloaderClass: 'preloader',
			pagination: {
				el: '.reviews__slider .pagination',
				clickable: true,
			},
			breakpoints: {
				320: {
					slidesPerView: 1.3,
					spaceBetween: 15,
				},
				768: {
					slidesPerView: 2.5,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
			},
		});
	}
	}
}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск ініціалізації слайдерів
	initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
});