import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { Info } from './ui/info';

interface Common {
  note?: string;
  link?: string;
}

interface Facility extends Common {
  name: string;
  available: boolean;
}

interface Location extends Common {
  name: string;
  distance: number;
}

type FeatureTableProps =
  | { variant: 'facilities'; facilities: Facility[] }
  | { variant: 'locations'; locations: Location[] };

const tableStyles = cva(
  'w-full border-collapse text-sm whitespace-nowrap text-fd-muted-foreground dark:text-gray-300',
  {
    variants: {
      variant: {
        facilities:
          'table-auto whitespace-nowrap text-sm text-fd-muted-foreground',
        locations:
          'table-fixed whitespace-nowrap text-sm text-fd-muted-foreground',
      },
    },
  }
);

const thStyles =
  'border-b px-4 py-2 text-left text-gray-700 dark:text-gray-200';
const tdStyles = 'border-b px-4 py-2';
const field = cva('inline-flex items-center gap-1');
const code = cva(
  'rounded-md bg-fd-secondary p-1 text-fd-secondary-foreground dark:bg-gray-700 dark:text-gray-100',
  {
    variants: {
      color: {
        primary: 'bg-fd-primary/10 text-fd-primary dark:bg-fd-primary/20',
      },
    },
  }
);

export function FeatureTable(props: FeatureTableProps) {
  return (
    <div className="prose prose-no-margin my-6 overflow-auto">
      <table className={cn(tableStyles({ variant: props.variant }))}>
        <thead>
          <tr>
            <th className={thStyles}>名稱</th>
            {props.variant === 'facilities' && (
              <th className={thStyles}>提供</th>
            )}
            {props.variant === 'locations' && (
              <th className={thStyles}>距離</th>
            )}
          </tr>
        </thead>
        <tbody>
          {props.variant === 'facilities' &&
            props.facilities.map(({ name, available, note, link }) => (
              <tr key={name}>
                <td className={tdStyles}>
                  <div className={field()}>
                    <code className={cn(code({ color: 'primary' }))}>
                      {link ? (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {name}
                        </a>
                      ) : (
                        name
                      )}
                    </code>
                    {note && <Info>{note}</Info>}
                  </div>
                </td>
                <td className={tdStyles}>{available ? '✅' : '❌'}</td>
              </tr>
            ))}
          {props.variant === 'locations' &&
            props.locations.map(({ name, distance, note, link }) => (
              <tr key={name}>
                <td className={tdStyles}>
                  <div className={field()}>
                    <code className={cn(code({ color: 'primary' }))}>
                      {link ? (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {name}
                        </a>
                      ) : (
                        name
                      )}
                    </code>
                    {note && <Info>{note}</Info>}
                  </div>
                </td>
                <td className={tdStyles}>
                  {distance < 1
                    ? `${distance * 1000} 公尺`
                    : `${distance} 公里`}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
