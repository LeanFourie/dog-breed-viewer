import type { Meta, StoryObj } from '@storybook/react-vite'
import { UiInput } from './ui-input'
import { useState } from 'react'
import { type TUiInputChangeEvent } from './ui-input.definitions'

const meta = {
    component: UiInput,
    title: 'forms/UiInput',
} satisfies Meta<typeof UiInput>

export default meta

type Story = StoryObj<typeof UiInput>

export const Default: Story = {
    render: (args) => {
        const [value, setValue] = useState(args.value)

        const handleChange = (event: TUiInputChangeEvent) => {
            setValue(event.currentTarget.value)
        }

        return <UiInput {...args} value={value} onChange={handleChange} />
    },

    args: {
        className: '',
        autoComplete: 'off',
        count: undefined,
        helperText: [...Array(2)].map((_) => ({
            icon: { type: 'text', value: 'check' },
            value: 'Helper text value',
        })),
        htmlFor: 'input',
        isDisabled: false,
        isLoading: false,
        isReadonly: false,
        isSkeleton: false,
        label: 'Input',
        leadingIcon: {
            type: 'text',
            value: 'circle',
            onClick: () => {
                console.log('Leading Icon')
            },
        },
        max: undefined,
        maxLength: undefined,
        min: undefined,
        minLength: undefined,
        onChange: (event) => {
            console.log(event)
        },
        onFocus: (event) => {
            console.log(event)
        },
        onBlur: (event) => {
            console.log(event)
        },
        onEnterPress: (event) => {
            console.log(event)
        },
        pattern: undefined,
        prefix: {
            value: '$',
            onClick: () => {
                console.log('Prefix')
            },
        },
        placeholder: 'Placeholder',
        requirement: 'none',
        size: 'md',
        state: 'neutral',
        style: {},
        suffix: { value: 'USD' },
        trailingIcon: { type: 'text', value: 'circle' },
        type: 'text',
        value: '',
    },
}
