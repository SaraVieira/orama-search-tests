import { IconStar, IconStarFilled } from '@tabler/icons-react';

export const Rating = ({ value, noText }: { value: number; noText?: boolean }) => {
  if (!value) return null;
  const arr = Array.from(Array(Math.round(value)).keys());
  const rest = Array.from(Array(5 - Math.round(value)).keys());

  return (
    <div className="flex items-center">
      {arr.map((star) => (
        <IconStarFilled className="w-4 h-4 text-yellow-300 me-1" key={star} />
      ))}
      {rest.map((star) => (
        <IconStar key={star} className="w-4 h-4 stroke-yellow-300 me-1 text-transparent" />
      ))}

      {!noText && (
        <>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            {parseFloat(value.toString()).toFixed(2)}
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
        </>
      )}
    </div>
  );
};
