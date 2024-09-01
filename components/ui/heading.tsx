'use client'
interface HeadingProps {
	title: string
	description: string
}

export function Heading({title, description}: HeadingProps) {
	return (
		<div>
			<h2 className="text-3xl font-bold tracking-tight">{title}</h2>
			<p className="text-sm dark:text-neutral-500 my-2">{description}</p>
		</div>
	)
}
