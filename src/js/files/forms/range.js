// Підключення з node_modules
import * as noUiSlider from 'nouislider';

// Підключення стилів з scss/base/forms/range.scss
// у файлі scss/forms/forms.scss

// Підключення стилів з node_modules
// import 'nouislider/dist/nouislider.css';

export function rangeInit() {
	const priceSliders = document.querySelectorAll('[data-range]');

	if (priceSliders) {

		priceSliders.forEach(priceSlider => {

			let priceSliderLine = priceSlider.querySelector('[data-range-line]')

			let textFrom = priceSliderLine.getAttribute('data-from');
			let textTo = priceSliderLine.getAttribute('data-to');
			let textStart = priceSliderLine.getAttribute('data-start');

			let inputRange = priceSlider.querySelector('[gata-range-input]')


			noUiSlider.create(priceSliderLine, {
				start: [Number(textStart)], // [0,200000]
				connect: [true, false],
				range: {
					'min': [Number(textFrom)],
					'max': [Number(textTo)]
				}
			});

			priceSliderLine.noUiSlider.on('update', function (values, handle) {

				if (Math.floor(values[handle]) == 0) {
					inputRange.value = ''
				} else {
					inputRange.value = Math.floor(values[handle])
				}

			})

			inputRange.addEventListener('change', (e) => {
				let valueInput = e.target.value
				priceSliderLine.noUiSlider.set([valueInput, null]);
			});

		});

	}
}
rangeInit();
