import { cn, formatDateRange, initials, isPlaceholder, orFallback } from '@/lib/utils';

describe('cn', () => {
  it('joins truthy class names only', () => {
    expect(cn('a', false, undefined, 'b', null)).toBe('a b');
  });
});

describe('isPlaceholder', () => {
  it.each([
    ['[Add university]', true],
    ['[Add start date]', true],
    ['Bayer', false],
    ['[Something else]', false],
    ['', false],
  ])('classifies %s as %s', (value, expected) => {
    expect(isPlaceholder(value)).toBe(expected);
  });
});

describe('orFallback', () => {
  it('returns the fallback for placeholders', () => {
    expect(orFallback('[Add year]', 'TBC')).toBe('TBC');
    expect(orFallback('2020', 'TBC')).toBe('2020');
  });
});

describe('initials', () => {
  it('derives up to two initials', () => {
    expect(initials('Dr. priyank Gupta')).toBe('PG');
    expect(initials('priyank')).toBe('P');
  });
});

describe('formatDateRange', () => {
  it('handles fully unknown ranges', () => {
    expect(formatDateRange('[Add start date]', '[Add end date]')).toBe(
      'Dates to be added'
    );
  });

  it('handles a known end only', () => {
    expect(formatDateRange('[Add start date]', '2019')).toBe('Until 2019');
  });

  it('handles an open-ended range', () => {
    expect(formatDateRange('2021', '[Add end date]')).toBe('2021 – present');
  });

  it('handles a complete range', () => {
    expect(formatDateRange('2018', '2021')).toBe('2018 – 2021');
  });
});
