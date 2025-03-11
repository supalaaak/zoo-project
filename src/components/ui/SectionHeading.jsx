export function SectionHeading({ subtitle, title, description = null, center = false }) {
    return (
      <div className={center ? "lg:text-center mb-12" : "mb-12"}>
        <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">{subtitle}</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </p>
        {description && (
          <p className={`mt-4 max-w-2xl text-xl text-gray-500 ${center ? "lg:mx-auto" : ""}`}>
            {description}
          </p>
        )}
      </div>
    );
  }