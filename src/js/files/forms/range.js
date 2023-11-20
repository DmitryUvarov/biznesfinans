// Підключення з node_modules
import * as noUiSlider from 'nouislider';

// Підключення стилів з scss/base/forms/range.scss
// у файлі scss/forms/forms.scss

// Підключення стилів з node_modules
// import 'nouislider/dist/nouislider.css';

let moneyFormat = wNumb({
    thousand: '.',
    suffix: ' сум'
});

function calc(option, value, day, type) {

    let monthsCal = day
    let rateValueCalc = value ? value : 0


    if (option) {

        // Расчет с %% месячной ставкой кредита
        const PMT = (rate, nper, pv) => {
            let pmt;

            if (rate === 0) {
                pmt = -pv / nper;
            } else {
                const pvif = Math.pow(1 + rate, nper);
                pmt = -rate * pv * pvif / (pvif - 1);
            }

            return pmt;
        };

        // Расчет с %% дневной ставкой кредита
        const calculateTotalPayment = (principal, dailyRate, days) => {
            let totalPayment = 0;

            totalPayment = Number(principal) * Number(dailyRate) * Number(days) + Number(principal)

            return Number(totalPayment.toFixed(2));
        };

        if (type == 'months') {
            let annualRate = option.getAttribute('data-rate'); // 84% annual rate

            let rate = annualRate / 12 / 100; // monthly rate
            let nper = Number(monthsCal) // 6 months
            let pv = Number(rateValueCalc) // present value

            let monthlyPayment = PMT(rate, nper, pv);
            let totalPaymentMount = Number((monthlyPayment * -1).toFixed(2))
            return totalPaymentMount ? moneyFormat.to(totalPaymentMount) : 0
        }

        if (type == 'day') {
            let principal = Number(rateValueCalc) // сумма кредита
            let dailyRate = option.getAttribute('data-rate') / 100; // 0.3% в день
            let days = Number(monthsCal) // срок в днях

            let totalPayment = calculateTotalPayment(principal, dailyRate, days);
            return moneyFormat.to(totalPayment)
        }

    }
}

export function rangeInit() {
    const priceSliders = document.querySelectorAll('[data-range]');

    if (priceSliders) {
        let day = 1;
        let currentValueRange = 0
        let activeOption = null
        let type = 'months'


        priceSliders.forEach(priceSlider => {
            let form = priceSlider.closest('form')
            let textDate = form.querySelector('[data-date]')
            let textMax = form.querySelector('[data-max]')
            let textPlace = form.querySelector('[data-text]')
            let textMonths = form.getAttribute('data-text-months')
            let textDay = form.getAttribute('data-text-day')
            let textOutMonths = form.getAttribute('data-text-out-months')
            let textOutDay = form.getAttribute('data-text-out-day')
            let dataOutputNumber = form.querySelector('[data-output-number]')
            let dataOutputTitle = form.querySelector('[data-output-title]')

            let priceSliderLine = priceSlider.querySelector('[data-range-line]')

            let textFrom = priceSliderLine.getAttribute('data-from');
            let textTo = priceSliderLine.getAttribute('data-to');
            let textStart = priceSliderLine.getAttribute('data-start');

            let inputRange = priceSlider.querySelector('[gata-range-input]')

            let option = form.querySelector('select option')
            activeOption = activeOption ? activeOption : option

            function setTtype(option) {
                type = option.getAttribute('data-months') ? 'months' : 'day'
            }

            function caclCallback(option, value, day) {
                setTtype(option)
                setText(option, value, day)
            }
            caclCallback(activeOption)

            function setText(option, value, day) {
                let numberMonths = option.getAttribute('data-months')
                let numberDay = option.getAttribute('data-day')
                option.getAttribute('data-months') ? textPlace.innerHTML = numberMonths + " " + textMonths : textPlace.innerHTML = numberDay + " " + textDay
                option.getAttribute('data-months') ? dataOutputTitle.innerHTML = textOutMonths : dataOutputTitle.innerHTML = textOutDay
                textMax.innerHTML = moneyFormat.to(Number(option.getAttribute('data-value')))
                dataOutputNumber.innerHTML = calc(option, value, day, type)

                if (type == 'day') {
                    textDate.innerHTML = getDate(day)
                } else {
                    textDate.innerHTML = getMonths(day)
                }
            }
            setText(activeOption, currentValueRange, day)

            function getDate(day) {
                let currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + Number(day));
                let monthNumber = currentDate.getMonth();

                // Массив названий месяцев
                let monthNames = [
                    "января", "февраля", "марта",
                    "апреля", "мая", "июня",
                    "июля", "августа", "сентября",
                    "октября", "ноября", "декабря"
                ];

                let formattedDate = currentDate.getDate() + ' ' + monthNames[monthNumber] + ', ' + currentDate.getFullYear();

                return formattedDate
            }

            function getMonths(months) {
                let currentDate = new Date();
                currentDate.setMonth(currentDate.getMonth() + Number(months));
                let day = currentDate.getDate();
                let monthNumber = currentDate.getMonth();
                let year = currentDate.getFullYear();
                let monthNames = [
                    "января", "февраля", "марта",
                    "апреля", "мая", "июня",
                    "июля", "августа", "сентября",
                    "октября", "ноября", "декабря"
                ];

                let formattedDate = `${day} ${monthNames[monthNumber]}, ${year}`;

                return formattedDate
            }

            noUiSlider.create(priceSliderLine, {
                start: [Number(textStart)], // [0,200000]
                connect: [true, false],
                step: 1,
                range: {
                    'min': [textFrom ? Number(textFrom) : 0],
                    'max': [Number(textTo)]
                }
            });




            priceSliderLine.noUiSlider.on('update', function(values, handle) {
                if (Math.floor(values[handle]) == 0) {
                    inputRange.value = ''
                } else {
                    inputRange.value = Math.floor(values[handle])
                }

                if (priceSliderLine.closest('[data-range-line-day]')) {
                    day = Math.round(values[handle])
                    caclCallback(activeOption, currentValueRange, values[handle])

                } else {
                    currentValueRange = Math.round(values[handle])
                    caclCallback(activeOption, values[handle], day)
                }
            })

            document.addEventListener('selectCallback', e => {
                let select = e.detail.select
                activeOption = select.options[select.selectedIndex];

                if (select.closest('[data-product]') && activeOption.closest('[data-rate]')) {

                    setText(activeOption)

                    let textTo = activeOption.getAttribute('data-value');
                    let textMonths = activeOption.getAttribute('data-months');
                    let textDay = activeOption.getAttribute('data-day');
                    let maxNum;
                    activeOption.getAttribute('data-months') ? maxNum = textMonths : maxNum = textDay


                    if (priceSliderLine.closest('[data-range-line-day]')) {
                        priceSliderLine.noUiSlider.updateOptions({
                            start: [textFrom ? Number(textFrom) : 0],
                            range: {
                                'min': [0],
                                'max': [Number(maxNum)]
                            },
                        });
                    } else {
                        priceSliderLine.noUiSlider.updateOptions({
                            start: [0],
                            range: {
                                'min': [0],
                                'max': [Number(textTo)]
                            },
                        });
                    }
                }
            })



            inputRange.addEventListener('change', (e) => {
                let valueInput = e.target.value
                priceSliderLine.noUiSlider.set([valueInput, null]);
            });

        });

    }
}

window.addEventListener('load', pageLoadRange)

function pageLoadRange() {
	rangeInit();
}