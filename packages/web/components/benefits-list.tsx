interface BenefitsListProps {
  benefits: string[];
}

export default function BenefitsList({ benefits }: BenefitsListProps) {
  return (
    <ul className="flex flex-col gap-2.5">
      {benefits.map((benefit) => (
        <li key={benefit} className="flex items-start gap-2.5">
          <svg
            className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
          <span className="text-sm text-[#374151]">{benefit}</span>
        </li>
      ))}
    </ul>
  );
}
