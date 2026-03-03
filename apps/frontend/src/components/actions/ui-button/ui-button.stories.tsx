import type { Meta, StoryObj } from '@storybook/react-vite'
import { UiButton } from './ui-button'

const meta = {
    component: UiButton,
    title: 'actions/UiButton',
} satisfies Meta<typeof UiButton>
export default meta

type Story = StoryObj<typeof UiButton>

export const Text = {
    args: {
        className: '',
        color: 'primary',
        isDisabled: false,
        isLoading: false,
        isSkeleton: false,
        onClick: () => {},
        shade: 'dark',
        shape: 'squircle',
        size: 'md',
        style: {},
        type: 'text',
        variant: 'filled',
        label: 'Button',
        leadingIcon: undefined,
        trailingIcon: undefined,
        tag: 'button'
    },
} satisfies Story

export const Icon = {
    args: {
        className: '',
        color: 'primary',
        isDisabled: false,
        isLoading: false,
        isSkeleton: false,
        onClick: () => {},
        shade: 'dark',
        shape: 'squircle',
        size: 'md',
        style: {},
        type: 'icon',
        variant: 'filled',
        icon: {
            type: 'text',
            value: 'home',
        },
        label: 'Button',
        tag: 'button'
    },
} satisfies Story
