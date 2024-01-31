import { Controller } from "react-hook-form"

const Input = ({
	type = "text",
	className = "",
	control,
	ref,
	...props
}) => {
	return (
		<Controller
			name="search"
			control={control}
			render={({ field: { onChange } }) => (
				<input
					className={`rounded-full py-2 px-4 outline-none w-full ${className}`} type={type} {...props} ref={ref}
					onChange={onChange}
				/>
			)}
		/>
	)
}

export default Input