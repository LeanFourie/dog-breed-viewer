import type { Meta, StoryObj } from '@storybook/react-vite'
import { UiFormWrapper } from './ui-form-wrapper'

const meta = {
    component: UiFormWrapper,
    title: 'forms/UiFormWrapper',
} satisfies Meta<typeof UiFormWrapper>
export default meta

type Story = StoryObj<typeof UiFormWrapper>

export const Default = {
    args: {
        children: <p>Hello world</p>,
        className: '',
        count: undefined,
        helperText: [...Array(2)].map((_) => ({
            icon: { type: 'text', value: 'check' },
            value: 'Helper text value',
        })),
        htmlFor: 'Hello',
        isSkeleton: false,
        label: 'Label',
        requirement: 'none',
        state: 'neutral',
        style: {},
    },
} satisfies Story
