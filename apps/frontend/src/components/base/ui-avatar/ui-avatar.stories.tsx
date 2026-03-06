import type { Meta, StoryObj } from '@storybook/react-vite'
import { UiAvatar } from './ui-avatar'

const meta = {
    component: UiAvatar,
    title: 'base/UiAvatar',
} satisfies Meta<typeof UiAvatar>
export default meta

type Story = StoryObj<typeof UiAvatar>

export const Icon = {
    args: {
        className: '',
        color: 'primary',
        isSelected: false,
        isSkeleton: false,
        shade: 'dark',
        size: 'md',
        style: {},
        type: 'icon',
    },
} satisfies Story

export const Image = {
    args: {
        className: '',
        isSelected: false,
        isSkeleton: false,
        size: 'md',
        style: {},
        type: 'image',
        alt: '',
        src: 'https://images.unsplash.com/photo-1766569590132-fb425d91d014?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
} satisfies Story

export const Initials = {
    args: {
        className: '',
        color: 'primary',
        isSelected: false,
        isSkeleton: false,
        shade: 'dark',
        size: 'md',
        style: {},
        type: 'initials',
        initials: 'JD',
    },
} satisfies Story
