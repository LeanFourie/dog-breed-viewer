import type { Meta, StoryObj } from '@storybook/react-vite'
import { UiImage } from './ui-image'

const meta = {
    component: UiImage,
    title: 'base/UiImage',
} satisfies Meta<typeof UiImage>
export default meta

type Story = StoryObj<typeof UiImage>

export const Default = {
    args: {
        alt: '',
        aspectRatio: '16:9',
        className: '',
        fit: 'contain',
        orientation: 'landscape',
        placeholder:
            'https://images.unsplash.com/photo-1766569590132-fb425d91d014?q=20&w=100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        shape: 'rectangle',
        src: 'https://images.unsplash.com/photo-1766569590132-fb425d91d014?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        style: {},
    },
} satisfies Story
