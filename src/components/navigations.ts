import { Activity, FileText, Home, Laptop, PenSquare } from 'lucide-react'

export const NAVIGATIONS = [
	{ label: 'Home', pathname: '/', icon: Home },
	{ label: 'Now', pathname: '/now', icon: Activity },
	{ label: 'Works', pathname: '/works', icon: Laptop },
	{ label: 'Notes', pathname: '/notes', icon: PenSquare },
	{ label: 'Resume', pathname: '/resume', icon: FileText },
]

export const SOCIALS = [
	{ label: 'Github', pathname: 'https://github.com/rimzzlabs' },
	{ label: 'LinkedIn', pathname: 'https://linkedin.com/in/rimzzlabs' },
	{ label: 'X/Twitter', pathname: 'https://twitter.com/rimzzlabs' },
]

export const OTHERS = [
	{ label: 'Resume', pathname: '/attachments/resume-rimzzlabs.pdf' },
	{ label: 'Source Code', pathname: 'https://github.com/rimzzlabs/website' },
]
