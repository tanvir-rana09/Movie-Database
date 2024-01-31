
const Button = ({
	text,
type="submit",
className="",
...props
}) => {
  return (
	<button type={type} className={`${className} rounded-full px-6 py-2`} {...props}>{text}</button>
  )
}

export default Button