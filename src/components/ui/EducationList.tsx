import { education } from '@/content/education';
import { isPlaceholder } from '@/lib/utils';

export function EducationList() {
  return (
    <ul className="space-y-6">
      {education.map((item) => (
        <li key={item.id} className="border-l-2 border-brand-500 py-1 pl-6">
          <h3 className="text-2xl font-semibold leading-snug text-white">
            {item.shortDegree} in {item.specialization}
          </h3>
          <p className="mt-3">
            {item.endYear}
            {!isPlaceholder(item.institution) && ` / ${item.institution}`}
          </p>
          {isPlaceholder(item.institution) && (
            <p className="text-sm">Institution awaiting owner confirmation.</p>
          )}
        </li>
      ))}
    </ul>
  );
}
