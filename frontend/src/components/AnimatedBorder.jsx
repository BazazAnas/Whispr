const AnimatedBorder = ({ children }) => {
    return (
        <div className="w-full h-full rounded-2xl overflow-hidden flex animated-border-v4 animate-border-rotate">
            <div className="w-full h-full flex  bg-transparent">
                {children}
            </div>
        </div>
    )
}

export default AnimatedBorder