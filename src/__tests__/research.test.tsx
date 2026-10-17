import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResearchPaperCard } from '@/components/research/ResearchPaperCard';
import { researchWorks } from '@/content/research';

it('keeps research abstracts collapsed by default and allows expanding and collapsing them', async () => {
  const paper = researchWorks[0];
  if (!paper) throw new Error('Missing research paper');

  const user = userEvent.setup();
  render(<ResearchPaperCard paper={paper} />);

  const toggle = screen.getByRole('button', { name: 'Expand abstract' });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).toHaveAttribute('aria-controls', `abstract-${paper.id}`);
  expect(screen.queryByText(paper.abstract)).not.toBeInTheDocument();

  await user.click(toggle);
  expect(screen.getByRole('button', { name: 'Collapse abstract' })).toHaveAttribute(
    'aria-expanded',
    'true'
  );
  expect(screen.getByText(paper.abstract)).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Collapse abstract' }));
  expect(screen.getByRole('button', { name: 'Expand abstract' })).toHaveAttribute(
    'aria-expanded',
    'false'
  );
  expect(screen.queryByText(paper.abstract)).not.toBeInTheDocument();
});
