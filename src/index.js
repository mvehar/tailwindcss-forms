const svgToDataUri = require('mini-svg-data-uri')
const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const [baseFontSize, {lineHeight: baseLineHeight}] = defaultTheme.fontSize.base
const {spacing, borderWidth, borderRadius} = defaultTheme

const forms = plugin.withOptions(function (options = {
    strategy: undefined,
    backgroundColor: undefined,
    placeholderColor: undefined,
    primaryColor: undefined,
    secondaryColor: undefined,
    checkboxColor: undefined,
    styles: undefined,
    focusStyles: undefined,
    inputPlaceholder: undefined,
    dateTimeWrapper: undefined,
    dateTimeValue: undefined,
    dateTime: undefined,
    select: undefined,
    multiple: undefined,
    checkboxRadio: undefined,
    checkbox: undefined,
    radio: undefined,
    checkboxRadioFocus: undefined,
    checkboxFocus: undefined,
    radioFocus: undefined,
    checkboxRadioChecked: undefined,
    checkboxChecked: undefined,
    radioChecked: undefined,
    checkboxRadioCheckedFocus: undefined,
    checkboxCheckedFocus: undefined,
    radioCheckedFocus: undefined,
    checkboxIndeterminate: undefined,
    checkboxIndeterminateHover: undefined,
    file: undefined,
    fileFocus: undefined,
}) {
    return function ({addBase, addComponents, theme}) {
        const strategy = options.strategy === undefined ? ['base', 'class'] : [options.strategy]
        const primaryColor = options.primaryColor || theme('colors.blue.600', colors.blue[600]);
        const secondaryColor = options.secondaryColor || theme('colors.gray.500', colors.gray[500]);

        const rules = [
            {
                base: [
                    "[type='text']",
                    "[type='email']",
                    "[type='url']",
                    "[type='password']",
                    "[type='number']",
                    "[type='date']",
                    "[type='datetime-local']",
                    "[type='month']",
                    "[type='search']",
                    "[type='tel']",
                    "[type='time']",
                    "[type='week']",
                    '[multiple]',
                    'textarea',
                    'select',
                ],
                class: ['.form-input', '.form-textarea', '.form-select', '.form-multiselect'],
                styles: {
                    appearance: 'none',
                    'background-color': options.backgroundColor || '#fff',
                    'border-color': secondaryColor,
                    'border-width': borderWidth['DEFAULT'],
                    'border-radius': borderRadius['none'],
                    'padding-top': spacing[2],
                    'padding-right': spacing[3],
                    'padding-bottom': spacing[2],
                    'padding-left': spacing[3],
                    'font-size': baseFontSize,
                    'line-height': baseLineHeight,
                    '--tw-shadow': '0 0 #0000',
                    '&:focus': {
                        outline: '2px solid transparent',
                        'outline-offset': '2px',
                        '--tw-ring-inset': 'var(--tw-empty,/*!*/ /*!*/)',
                        '--tw-ring-offset-width': '0px',
                        '--tw-ring-offset-color': '#fff',
                        '--tw-ring-color': primaryColor,
                        '--tw-ring-offset-shadow': `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
                        '--tw-ring-shadow': `var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
                        'box-shadow': `var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)`,
                        'border-color': primaryColor,
                        ...options.focusStyles
                    },
                    ...options.styles
                },
            },
            {
                base: ['input::placeholder', 'textarea::placeholder'],
                class: ['.form-input::placeholder', '.form-textarea::placeholder'],
                styles: {
                    color: secondaryColor,
                    opacity: '1',
                    ...options.inputPlaceholder
                },
            },
            {
                base: ['::-webkit-datetime-edit-fields-wrapper'],
                class: ['.form-input::-webkit-datetime-edit-fields-wrapper'],
                styles: {
                    padding: '0',
                    ...options.dateTimeWrapper
                },
            },
            {
                // Unfortunate hack until https://bugs.webkit.org/show_bug.cgi?id=198959 is fixed.
                // This sucks because users can't change line-height with a utility on date inputs now.
                // Reference: https://github.com/twbs/bootstrap/pull/31993
                base: ['::-webkit-date-and-time-value'],
                class: ['.form-input::-webkit-date-and-time-value'],
                styles: {
                    'min-height': '1.5em',
                    ...options.dateTimeValue
                },
            },
            {
                // In Safari on macOS date time inputs are 4px taller than normal inputs
                // This is because there is extra padding on the datetime-edit and datetime-edit-{part}-field pseudo elements
                // See https://github.com/tailwindlabs/tailwindcss-forms/issues/95
                base: [
                    '::-webkit-datetime-edit',
                    '::-webkit-datetime-edit-year-field',
                    '::-webkit-datetime-edit-month-field',
                    '::-webkit-datetime-edit-day-field',
                    '::-webkit-datetime-edit-hour-field',
                    '::-webkit-datetime-edit-minute-field',
                    '::-webkit-datetime-edit-second-field',
                    '::-webkit-datetime-edit-millisecond-field',
                    '::-webkit-datetime-edit-meridiem-field',
                ],
                class: [
                    '.form-input::-webkit-datetime-edit',
                    '.form-input::-webkit-datetime-edit-year-field',
                    '.form-input::-webkit-datetime-edit-month-field',
                    '.form-input::-webkit-datetime-edit-day-field',
                    '.form-input::-webkit-datetime-edit-hour-field',
                    '.form-input::-webkit-datetime-edit-minute-field',
                    '.form-input::-webkit-datetime-edit-second-field',
                    '.form-input::-webkit-datetime-edit-millisecond-field',
                    '.form-input::-webkit-datetime-edit-meridiem-field',
                ],
                styles: {
                    'padding-top': 0,
                    'padding-bottom': 0,
                    ...options.dateTime
                },
            },
            {
                base: ['select'],
                class: ['.form-select'],
                styles: {
                    'background-image': `url("${svgToDataUri(
                        `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="${primaryColor}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>`
                    )}")`,
                    'background-position': `right ${spacing[2]} center`,
                    'background-repeat': `no-repeat`,
                    'background-size': `1.5em 1.5em`,
                    'padding-right': spacing[10],
                    'color-adjust': `exact`,
                    ...options.select
                },
            },
            {
                base: ['[multiple]'],
                class: null,
                styles: {
                    'background-image': 'initial',
                    'background-position': 'initial',
                    'background-repeat': 'unset',
                    'background-size': 'initial',
                    'padding-right': spacing[3],
                    'color-adjust': 'unset',
                    ...options.multiple
                },
            },
            {
                base: [`[type='checkbox']`, `[type='radio']`],
                class: ['.form-checkbox', '.form-radio'],
                styles: {
                    appearance: 'none',
                    padding: '0',
                    'color-adjust': 'exact',
                    display: 'inline-block',
                    'vertical-align': 'middle',
                    'background-origin': 'border-box',
                    'user-select': 'none',
                    'flex-shrink': '0',
                    height: spacing[4],
                    width: spacing[4],
                    color: primaryColor,
                    'background-color': options.backgroundColor || '#fff',
                    'border-color': options.checkboxColor || primaryColor,
                    'border-width': borderWidth['DEFAULT'],
                    '--tw-shadow': '0 0 #0000',
                    ...options.checkboxRadio
                },
            },
            {
                base: [`[type='checkbox']`],
                class: ['.form-checkbox'],
                styles: {
                    'border-radius': borderRadius['none'],
                    ...options.checkbox
                },
            },
            {
                base: [`[type='radio']`],
                class: ['.form-radio'],
                styles: {
                    'border-radius': '100%',
                    ...options.radio
                },
            },
            {
                base: [`[type='checkbox']:focus`, `[type='radio']:focus`],
                class: ['.form-checkbox:focus', '.form-radio:focus'],
                styles: {
                    outline: '2px solid transparent',
                    'outline-offset': '2px',
                    '--tw-ring-inset': 'var(--tw-empty,/*!*/ /*!*/)',
                    '--tw-ring-offset-width': '2px',
                    '--tw-ring-offset-color': '#fff',
                    '--tw-ring-color': primaryColor,
                    '--tw-ring-offset-shadow': `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
                    '--tw-ring-shadow': `var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
                    'box-shadow': `var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)`,
                    ...options.checkboxRadioFocus
                },
            },
            {
                base: [`[type='checkbox']:checked`, `[type='radio']:checked`],
                class: ['.form-checkbox:checked', '.form-radio:checked'],
                styles: {
                    'border-color': `transparent`,
                    'background-color': `currentColor`,
                    'background-size': `100% 100%`,
                    'background-position': `center`,
                    'background-repeat': `no-repeat`,
                    ...options.checkboxRadioChecked
                },
            },
            {
                base: [`[type='checkbox']:checked`],
                class: ['.form-checkbox:checked'],
                styles: {
                    'background-image': `url("${svgToDataUri(
                        `<svg viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/></svg>`
                    )}")`,
                    ...options.checkboxChecked
                },
            },
            {
                base: [`[type='radio']:checked`],
                class: ['.form-radio:checked'],
                styles: {
                    'background-image': `url("${svgToDataUri(
                        `<svg viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="3"/></svg>`
                    )}")`,
                    ...options.radioChecked
                },
            },
            {
                base: [
                    `[type='checkbox']:checked:hover`,
                    `[type='checkbox']:checked:focus`,
                    `[type='radio']:checked:hover`,
                    `[type='radio']:checked:focus`,
                ],
                class: [
                    '.form-checkbox:checked:hover',
                    '.form-checkbox:checked:focus',
                    '.form-radio:checked:hover',
                    '.form-radio:checked:focus',
                ],
                styles: {
                    'border-color': 'transparent',
                    'background-color': 'currentColor',
                    ...options.checkboxRadioCheckedFocus
                },
            },
            {
                base: [`[type='checkbox']:indeterminate`],
                class: ['.form-checkbox:indeterminate'],
                styles: {
                    'background-image': `url("${svgToDataUri(
                        `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h8"/></svg>`
                    )}")`,
                    'border-color': `transparent`,
                    'background-color': `currentColor`,
                    'background-size': `100% 100%`,
                    'background-position': `center`,
                    'background-repeat': `no-repeat`,
                    ...options.checkboxIndeterminate
                },
            },
            {
                base: [`[type='checkbox']:indeterminate:hover`, `[type='checkbox']:indeterminate:focus`],
                class: ['.form-checkbox:indeterminate:hover', '.form-checkbox:indeterminate:focus'],
                styles: {
                    'border-color': 'transparent',
                    'background-color': 'currentColor',
                    ...options.checkboxIndeterminateHover
                },
            },
            {
                base: [`[type='file']`],
                class: null,
                styles: {
                    background: 'unset',
                    'border-color': 'inherit',
                    'border-width': '0',
                    'border-radius': '0',
                    padding: '0',
                    'font-size': 'unset',
                    'line-height': 'inherit',
                    ...options.file
                },
            },
            {
                base: [`[type='file']:focus`],
                class: null,
                styles: {
                    outline: `1px solid ButtonText`,
                    outline: `1px auto -webkit-focus-ring-color`,
                    ...options.fileFocus
                },
            },
        ]

        const getStrategyRules = (strategy) => rules
            .map((rule) => {
                if (rule[strategy] === null) return null

                return {[rule[strategy]]: rule.styles}
            })
            .filter(Boolean)

        if (strategy.includes('base')) {
            addBase(getStrategyRules('base'))
        }

        if (strategy.includes('class')) {
            addComponents(getStrategyRules('class'))
        }
    }
})

module.exports = forms
